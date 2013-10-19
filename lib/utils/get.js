/* Modules */

var path = require('path');

/* Get */

var Get = function() {};

var TAG = /.*<!--\s+@include\s+(.*\..*)\s+-->.*/g;

Get.prototype.path = function(filename) {
  return path.join(process.cwd(), '/', filename);
};

Get.prototype.filename = function(filename) {
  return path.basename(filename);
};

Get.prototype.lines = function(content) {
  return content.replace(/(\r\n|\n|\r)/gm, '\n').split('\n');
};

Get.prototype.partialTag = function(content) {
  return content.match(TAG);
};

Get.prototype.partialName = function(content) {
  return content.replace(TAG, '$1');
};

/* Exports */

module.exports = Get;
