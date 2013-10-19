/* Modules */

var fs = require('fs');

/* File */

var File = function() {};

File.prototype.read = function(file, callback) {
  try {
    var data = fs.readFileSync(file);
    return callback(null, data);
  } catch(err) {
    return callback(err);
  }
};

File.prototype.save = function(file, content, callback) {
  try {
    fs.writeFileSync(file, content);
    return callback(null);
  } catch(err) {
    return callback(err);
  }
};

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
