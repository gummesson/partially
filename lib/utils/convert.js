/* Convert */

var Convert = function() {};

// Returns the `line` as a string.
Convert.prototype.line = function(line) {
  return line.toString();
};

// Returns the `lines` as a string with linebreaks.
Convert.prototype.lines = function(lines) {
  return lines.join('\n');
};

/* Exports */

module.exports = Convert;
