/* Modules */
 
var path    = require('path'),
    Get     = require('./utils/get'),
    get     = new Get(),
    File    = require('./utils/file'),
    file    = new File(),
    Replace = require('./utils/replace'),
    replace = new Replace();
 
/* Partially */
 
// Initialization
var Partially = function(file, partials, output) {
  this.templateFile = get.path(file || 'template/index.html');
  this.partialsDir  = get.path(partials || 'partials');
  this.outputDir    = get.path(output || 'output');
};
 
Partially.prototype.render = function(done) {
  done = done || function() {};
  this.parseTemplate(function(err, filename, lines) {
    if (err) { return done(err); }
    this.parseContent(lines, function(err, content) {
      if (err) { return done(err); }
      this.saveOutput(filename, content, function(err, filename) {
        if (err) { return done(err); }
        done(null, filename);
      });
    }.bind(this));
  }.bind(this));
};
 
// Template
Partially.prototype.parseTemplate = function(callback) {
  file.read(this.templateFile, function(err, data) {
    if (err) { return callback(err); }
    var lines = get.lines(data.toString());
    this.parseTemplateName(this.templateFile, function(filename) {
      return callback(null, filename, lines);
    });
  }.bind(this));
};
 
Partially.prototype.parseTemplateName = function(file, callback) {
   var basename = get.filename(file),
       filename = path.join(this.outputDir, '/', basename);
   return callback(filename);
};
 
// Content
Partially.prototype.parseContent = function(lines, callback) {
  var content = [];
  lines.forEach(function(line) {
    this.parseTag(line, function(tag) {
      if (tag) {
        this.parsePartial(tag, function(err, partial) {
          if (err) { return callback(err); }
          content.push(partial);
        });
       } else {
         content.push(line);
       }
    }.bind(this));
  }.bind(this));
  return callback(null, content);
};
 
// Tag
Partially.prototype.parseTag = function(line, callback) {
  var tag = get.partialTag(line);
  return callback(tag);
};
 
// Partial
Partially.prototype.parsePartial = function(tag, callback) {
  this.parsePartialName(tag, function(filename) {
    file.read(filename, function(err, data) {
      if (err) { return callback(err); }
      var partial = replace.content(tag.toString(), data.toString());
      return callback(null, partial);
    });
  });
};
 
Partially.prototype.parsePartialName = function(tag, callback) {
  var filename = get.partialName(tag.toString()),
      filepath = path.join(this.partialsDir, '/', filename);
  return callback(filepath);
};
 
// Output
Partially.prototype.saveOutput = function(filename, content, callback) {
  var output = content.join('\n');
  file.mkDir(this.outputDir, function(err) {
    if (err) { return callback(err); }
    file.save(filename, output, function(err) {
      if (err) { return callback(err); }
      return callback(null, filename);
    });
  });
};
 
/* Exports */
 
module.exports = function(file, partials, output) {
  return new Partially(file, partials, output);
};
