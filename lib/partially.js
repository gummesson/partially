//
// # Partially
//
// Use partials in your markup.
//
// **License**: MIT  
// **Source**: [Github](https://github.com/gummesson/partially)
//
 
// ## partially.js
 
// ### Modules
//
// Import the required modules.

var path    = require('path'),
    Convert = require('./utils/convert'),
    convert = new Convert(),
    Get     = require('./utils/get'),
    get     = new Get(),
    File    = require('./utils/file'),
    file    = new File(),
    Replace = require('./utils/replace'),
    replace = new Replace();

// ### Initialization
//
// Creates the paths to the template file, the "partials" directory and
// the "output" directory by assigning and converting the values from
// the `file`, `partials` and `output`.
var Partially = function(file, partials, output) {
  this.templateFile = get.path(file || 'template/index.html');
  this.partialsDir  = get.path(partials || 'partials');
  this.outputDir    = get.path(output || 'output');
};

// #### Compile
//
// Runs through the parsing of the template, the parsing of the content,
// saves the outpute file and returns the full path of the filename when
// everything's been executed.
Partially.prototype.compile = function(done) {
  done = done || function() {};
  this.render(function(err, filename, content) {
    if (err) { return done(err); }
    this.saveOutput(filename, content, function(err, filename) {
      if (err) { return done(err); }
      return done(null, filename);
    });
  }.bind(this));
};

// #### Render
//
// Runs through the parsing of the template and the parsing of the content
// and returns full path to the output file and the parsed content when
// everything's been executed.
Partially.prototype.render = function(done) {
  done = done || function() {};
  this.parseTemplate(function(err, filename, lines) {
    if (err) { return done(err); }
    this.parseContent(lines, function(err, content) {
      if (err) { return done(err); }
      return done(null, filename, content);
    });
  }.bind(this));
};

// ### Template
//
// Returns the output file's path and all of the lines in the template file
// by parsing its filename and content.
Partially.prototype.parseTemplate = function(callback) {
  file.read(this.templateFile, function(err, data) {
    if (err) { return callback(err); }
    var lines = get.lines(data);
    this.parseTemplateName(this.templateFile, function(filename) {
      return callback(null, filename, lines);
    });
  }.bind(this));
};

// #### Template name
//
// Returns the full path of the soon-to-be compiled output file
// by converting the `file`.
Partially.prototype.parseTemplateName = function(file, callback) {
   var basename = get.filename(file),
       filename = path.join(this.outputDir, '/', basename);
   return callback(filename);
};

// ### Content
//
// Returns the content by looping through the `lines` and replacing all of
// the `@include` expressions with the content of the partials.
Partially.prototype.parseContent = function(lines, callback) {
  var content = [];
  lines.forEach(function(line) {
    this.parseTag(line, function(tag) {
      if (tag) {
        this.parsePartial(convert.line(tag), function(err, partial) {
          if (err) { return callback(err); }
          content.push(partial);
        });
       } else {
         content.push(line);
       }
    }.bind(this));
  }.bind(this));
  return callback(null, convert.lines(content));
};

// #### Tag
//
// Returns whether or not the `line` matches the `@include` expression.
Partially.prototype.parseTag = function(line, callback) {
  var tag = get.partialTag(line);
  return callback(tag);
};

// #### Partial
//
// Returns the actual content of the partial file.
Partially.prototype.parsePartial = function(tag, callback) {
  this.parsePartialName(tag, function(filename) {
    file.read(filename, function(err, data) {
      if (err) { return callback(err); }
      var partial = replace.content(tag, data);
      return callback(null, partial);
    });
  });
};

// ##### Partial name
//
// Returns the full path of the partial by converting the `tag`.
Partially.prototype.parsePartialName = function(tag, callback) {
  var filename = get.partialName(tag),
      filepath = path.join(this.partialsDir, '/', filename);
  return callback(filepath);
};

// ### Output
//
// Returns the filename and saves the output file with the `content`.
Partially.prototype.saveOutput = function(filename, content, callback) {
  file.mkDir(this.outputDir, function(err) {
    if (err) { return callback(err); }
    file.save(filename, content, function(err) {
      if (err) { return callback(err); }
      return callback(null, filename);
    });
  });
};

// ### Exports
 
// Returns a new `Partially` instance with the given `file`, `partials`
// and `output`.
module.exports = function(file, partials, output) {
  return new Partially(file, partials, output);
};
