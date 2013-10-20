/* Modules */

var path = require('path');

/* Get */

var Get = function() {};

// The regular expression for the `@include` rule,
// ie: `<!-- @include partial.ext -->`.
var TAG = /.*<!--\s+@include\s+(.*\..*)\s+-->.*/g;

// Returns the full path of `filename`.
Get.prototype.path = function(filename) {
  return path.join(process.cwd(), '/', filename);
};

// Returns the base filename of the `filename`,
// ie: `index.html`.
Get.prototype.filename = function(filename) {
  return path.basename(filename);
};

// Returns an array of the `content` with normalized line breaks.
Get.prototype.lines = function(content) {
  return content.replace(/(\r\n|\n|\r)/gm, '\n').split('\n');
};

// Returns whether or not the `content` matches the `@include` expression.
Get.prototype.partialTag = function(content) {
  return content.match(TAG);
};

// Returns the filename of the `@include` expression in the `content`.
Get.prototype.partialName = function(content) {
  return content.replace(TAG, '$1');
};

/* Exports */

module.exports = Get;
