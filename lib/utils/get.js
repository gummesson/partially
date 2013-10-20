// ## utils/get.js

// ### Modules
//
// Import the required modules.
//
var path = require('path');

// ### Get
//
// Defines the namespace.
//
var Get = function() {};

// #### Tag
//
// Defines the regular expression for the `@include` pattern, ie:  
// `<!-- @include partial.ext -->`.
//
var TAG = /.*<!--\s+@include\s+(.*\..*)\s+-->.*/g;

// #### Path
//
// Returns the full path of `filename`.
//
// - `filename` represents a string.
//
Get.prototype.path = function(filename) {
  return path.join(process.cwd(), '/', filename);
};

// #### Filename
//
// Returns the base filename of the `filename`, ie:  
// `index.html`.
//
// - `filename` represents a string.
//
Get.prototype.filename = function(filename) {
  return path.basename(filename);
};

// #### Lines
//
// Returns an array of the `content` with normalized line breaks.
//
// - `content` represents a string.
//
Get.prototype.lines = function(content) {
  return content.replace(/(\r\n|\n|\r)/gm, '\n').split('\n');
};

// #### Partial tag
//
// Returns whether or not the `content` matches the `@include` pattern.
//
// - `content` represents a string.
//
Get.prototype.partialTag = function(content) {
  return content.match(TAG);
};

// #### Partial name
//
// Returns the filename of the `@include` expression in the `content`.
//
// - `content` represents a string.
//
Get.prototype.partialName = function(content) {
  return content.replace(TAG, '$1');
};

// ### Exports
//
// Export `Get`.
//
module.exports = Get;
