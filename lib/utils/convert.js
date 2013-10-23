// ## utils/convert.js
 
// ### Convert
//
// The constructor.
//
var Convert = function() {};

// #### Convert.prototype.line 
//
// Return the `line` as a string.
//
// - `line` is an array.
//
Convert.prototype.line = function(line) {
  return line.toString();
};

// #### Convert.prototype.lines
//
// Return the `lines` as a string with linebreaks.
//
// - `lines` is an array.
//
Convert.prototype.lines = function(lines) {
  return lines.join('\n');
};

// ### Exports
//
// Export `Convert`.
//
module.exports = Convert;
