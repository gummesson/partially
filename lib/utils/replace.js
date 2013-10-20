// ## utils/replace.js
 
// ### Replace
//
// Defines the namespace.
var Replace = function() {};

// #### Content
//
// Removes extraneous whitespace and returns the `content` with 
// the `@include` expression replaced with the actual content of 
// the partial file.
Replace.prototype.content = function(content, replacement) {
  return content.replace(content, replacement).trimRight();
};

// ### Exports
//
// Export `Replace`.
module.exports = Replace;
