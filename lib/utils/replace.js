// ## utils/replace.js
 
// ### Replace
//
// The constructor.
//
var Replace = function() {};

// #### Replace.prototype.content
//
// Remove extraneous whitespace and return the `content` with 
// the `@include` pattern replaced with the actual markup content of 
// the partial file.
//
// - `content`     is a string.
// - `replacement` is a string.
//
Replace.prototype.content = function(content, replacement) {
  return content.replace(content, replacement).trimRight();
};

// ### Exports
//
// Export `Replace`.
//
module.exports = Replace;
