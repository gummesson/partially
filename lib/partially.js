//
// # Partially
//
// Use partials in your markup.
//
// **Partially** is a build tool for using 
// [Hammer for Mac](http://hammerformac.com/)-like 
// `@include`'s in your markup language of choice.
//
// **License**: MIT  
// **Source**: [GitHub](https://github.com/gummesson/partially)
//

// ## partially.js

// ### Modules
//
// Import the required modules.
//
var path    = require('path'),
    Convert = require('./utils/convert'),
    convert = new Convert(),
    Get     = require('./utils/get'),
    get     = new Get(),
    File    = require('./utils/file'),
    file    = new File(),
    Replace = require('./utils/replace'),
    replace = new Replace();

// ### Partially
//
// Create the paths to the template file, the "partials" directory and
// the "output" directory by assigning and converting the values from
// the `file`, `partials` and `output`.
//
//  - `file`     is a string.
//  - `partials` is a string.
//  - `ouput`    is a string.
//
var Partially = function(file, partials, output) {
  this.templateFile = get.path(file || 'template/index.html');
  this.partialsDir  = get.path(partials || 'partials');
  this.outputDir    = get.path(output || 'output');
};

// #### Partially.prototype.compile
//
// Run through the parsing of the template, the parsing of the content,
// saves the outpute file and return the full path of the filename when
// everything's been executed.
//
// - `done` is a function.
//
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

// #### Partially.prototype.render
//
// Run through the parsing of the template and the parsing of the content
// and return full path to the output file and the parsed content when
// everything's been executed.
//
// - `done` is a function.
//
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

// #### Partially.prototype.parseTemplate
//
// Return the output file's path and all of the lines in the template file
// by parsing its filename and content.
//
// - `callback` is a function.
//
Partially.prototype.parseTemplate = function(callback) {
  file.read(this.templateFile, function(err, data) {
    if (err) { return callback(err); }
    var lines = get.lines(data);
    this.parseTemplateName(this.templateFile, function(filename) {
      return callback(null, filename, lines);
    });
  }.bind(this));
};

// #### Partially.prototype.parseTemplateName
//
// Return the full path of the soon-to-be compiled output file
// by converting the `file`.
//
// - `file`     is a string.
// - `callback` is a function.
//
Partially.prototype.parseTemplateName = function(file, callback) {
   var basename = get.filename(file),
       filename = path.join(this.outputDir, '/', basename);
   return callback(filename);
};

// #### Partially.prototype.parseContent
//
// Return the content by looping through the `lines` and replacing all of
// the `@include` patterns with the content of the partials.
//
// - `lines`    is an array.
// - `callback` is a function.
//
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

// #### Partially.prototype.parseTag
//
// Return whether or not the `line` matches the `@include` pattern.
//
// - `line`     is a string.
// - `callback` is a function.
//
Partially.prototype.parseTag = function(line, callback) {
  var tag = get.partialTag(line);
  return callback(tag);
};

// #### Partially.prototype.parsePartial
//
// Return the actual content of the partial file.
//
// - `tag`      is a string.
// - `callback` is a function.
//
Partially.prototype.parsePartial = function(tag, callback) {
  this.parsePartialName(tag, function(filename) {
    file.read(filename, function(err, data) {
      if (err) { return callback(err); }
      var partial = replace.content(tag, data);
      return callback(null, partial);
    });
  });
};

// #### Partially.prototype.parsePartialName
//
// Return the full path of the partial by converting the `tag`.
//
// - `tag`      is a string.
// - `callback` is a function.
//
Partially.prototype.parsePartialName = function(tag, callback) {
  var filename = get.partialName(tag),
      filepath = path.join(this.partialsDir, '/', filename);
  return callback(filepath);
};

// #### Partially.prototype.saveOutput
//
// Return the filename and saves the output file with the `content`.
//
// - `filename` is a string.
// - `content`  is a string.
// - `callback` is a function.
//
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

// Return a new `Partially` instance with the given `file`, `partials`
// and `output` paths.
//
// - `file`     is a string.
// - `partials` is a string.
// - `output`   is a string.
//
module.exports = function(file, partials, output) {
  return new Partially(file, partials, output);
};
