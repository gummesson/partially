// ## utils/convert.js
 
// ### Convert
//
// Define the namespace.
//
var Convert = function() {};

// #### Line
//
// Return the `line` as a string.
//
// - `line` represents an array.
//
Convert.prototype.line = function(line) {
  return line.toString();
};

// #### Lines
//
// Return the `lines` as a string with linebreaks.
//
// - `lines` represents an array.
//
Convert.prototype.lines = function(lines) {
  return lines.join('\n');
};

// ### Exports
//
// Export `Convert`.
//
module.exports = Convert;
