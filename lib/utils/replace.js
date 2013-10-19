/* Replace */

var Replace = function() {};

// Removes extraneous whitespace and returns the `content` with 
// the `@include` expression replaced with the actual content of 
// the partial file.
Replace.prototype.content = function(content, replacement) {
  return content.replace(content, replacement).trimRight();
};

/* Exports */

module.exports = Replace;
