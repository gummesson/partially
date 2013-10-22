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

// #### Read
//
// Read the `file` (synchronously) and returns the data.
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
// Save the `file` and `content` (synchronously).
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
// Create the `path` (synchronously).
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
