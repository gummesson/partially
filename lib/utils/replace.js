// ## utils/replace.js
 
// ### Replace
//
// The namespace.
//
var Replace = function() {};

// #### Content
//
// Remove extraneous whitespace and return the `content` with 
// the `@include` pattern replaced with the actual markup content of 
// the partial file.
//
// - `content`     represents a string.
// - `replacement` represents a string.
//
Replace.prototype.content = function(content, replacement) {
  return content.replace(content, replacement).trimRight();
};

// ### Exports
//
// Export `Replace`.
//
module.exports = Replace;
