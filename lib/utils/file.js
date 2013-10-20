// ## utils/file.js
 
// ### Modules
//
// Import the required modules.
//
var fs = require('fs');

// ### File
//
// Defines the namespace.
//
var File = function() {};

// #### Read
//
// Reads the `file` (synchronously) and returns the data.
//
// - `file`     represents a string.
// - `callback` represents a function.
//
File.prototype.read = function(file, callback) {
  try {
    var data = fs.readFileSync(file, { encoding: 'utf8' });
    return callback(null, data);
  } catch(err) {
    return callback(err);
  }
};

// #### Save
//
// Saves the `file` and `content` (synchronously).
//
// - `file`     represents a string.
// - `content`  represents a string.
// - `callback` represents a function.
//
File.prototype.save = function(file, content, callback) {
  try {
    fs.writeFileSync(file, content, { encoding: 'utf8' });
    return callback(null);
  } catch(err) {
    return callback(err);
  }
};

// #### Make directory
//
// Creates the `path` (synchronously).
//
// - `path`     represents a string.
// - `callback` represents a function.
//
File.prototype.mkDir = function(path, callback) {
  try {
    if (!fs.existsSync(path)) { fs.mkdirSync(path); }
    return callback(null);
  } catch(err) {
    return callback(err);
  }
};

// ### Exports
//
// Export `File`.
//
module.exports = File;
