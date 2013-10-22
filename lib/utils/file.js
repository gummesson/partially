// ## utils/file.js
 
// ### Modules
//
// Import the required modules.
//
var fs = require('fs');

// ### File
//
// Define the namespace.
//
var File = function() {};

// #### File.prototype.read
//
// Read the `file` (synchronously) and returns the data.
//
// - `file`     is a string.
// - `callback` is a function.
//
File.prototype.read = function(file, callback) {
  try {
    var data = fs.readFileSync(file, { encoding: 'utf8' });
    return callback(null, data);
  } catch(err) {
    return callback(err);
  }
};

// #### File.prototype.save
//
// Save the `file` and `content` (synchronously).
//
// - `file`     is a string.
// - `content`  is a string.
// - `callback` is a function.
//
File.prototype.save = function(file, content, callback) {
  try {
    fs.writeFileSync(file, content, { encoding: 'utf8' });
    return callback(null);
  } catch(err) {
    return callback(err);
  }
};

// #### File.prototype.mkDir
//
// Create the `path` (synchronously).
//
// - `path`     is a string.
// - `callback` is a function.
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
