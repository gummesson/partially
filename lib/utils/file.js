/* Modules */

var fs = require('fs');

/* File */

var File = function() {};

// Reads the `file` (synchronously) and returns the data.
File.prototype.read = function(file, callback) {
  try {
    var data = fs.readFileSync(file);
    return callback(null, data);
  } catch(err) {
    return callback(err);
  }
};

// Saves the `file` and `content` (synchronously).
File.prototype.save = function(file, content, callback) {
  try {
    fs.writeFileSync(file, content);
    return callback(null);
  } catch(err) {
    return callback(err);
  }
};

// Creates the `path` (synchronously).
File.prototype.mkDir = function(path, callback) {
  try {
    if (!fs.existsSync(path)) { fs.mkdirSync(path); }
    return callback(null);
  } catch(err) {
    return callback(err);
  }
};

/* Exports */

module.exports = File;
