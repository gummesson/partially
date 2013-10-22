// ## utils/get.js

// ### Modules
//
// Import the required modules.
//
var path = require('path');

// ### Get
//
// The namespace.
//
var Get = function() {};

// #### Tag
//
// The regular expression for the `@include` pattern, ie:  
// `<!-- @include partial.ext -->`.
//
var TAG = /.*<!--\s+@include\s+(.*\..*)\s+-->.*/g;

// #### Get.prototype.path
//
// Return the full path of `filename`.
//
// - `filename` is a string.
//
Get.prototype.path = function(filename) {
  return path.join(process.cwd(), '/', filename);
};

// #### Get.prototype.filename
//
// Return the base filename of the `filename`, ie:  
// `index.html`.
//
// - `filename` is a string.
//
Get.prototype.filename = function(filename) {
  return path.basename(filename);
};

// #### Get.prototype.lines
//
// Return an array of the `content` with normalized line breaks.
//
// - `content` is a string.
//
Get.prototype.lines = function(content) {
  return content.replace(/(\r\n|\n|\r)/gm, '\n').split('\n');
};

// #### Get.prototype.partialTag
//
// Return whether or not the `content` matches the `@include` pattern.
//
// - `content` is a string.
//
Get.prototype.partialTag = function(content) {
  return content.match(TAG);
};

// #### Get.prototype.partialName
//
// Return the filename of the `@include` pattern in the `content`, ie:  
// `partial.html`.
//
// - `content` is a string.
//
Get.prototype.partialName = function(content) {
  return content.replace(TAG, '$1');
};

// ### Exports
//
// Export `Get`.
//
module.exports = Get;
