/* Replace */

var Replace = function() {};

Replace.prototype.content = function(content, replacement) {
  return content.replace(content, replacement).trimRight();
};

/* Exports */

module.exports = Replace;
