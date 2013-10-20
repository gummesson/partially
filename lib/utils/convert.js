// ## utils/convert.js
 
// ### Convert
//
// Defines the namespace.

var Convert = function() {};

// #### Line
//
// Returns the `line` as a string.
Convert.prototype.line = function(line) {
  return line.toString();
};

// #### Lines
//
// Returns the `lines` as a string with linebreaks.
Convert.prototype.lines = function(lines) {
  return lines.join('\n');
};

// ### Exports
//
// Export `Convert`.
module.exports = Convert;
