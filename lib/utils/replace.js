// ## utils/replace.js
 
// ### Replace
//
// Defines the namespace.
//
var Replace = function() {};

// #### Content
//
// Removes extraneous whitespace and returns the `content` with 
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
