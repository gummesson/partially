/* Modules */

var must    = require('must'),
    Convert = require('../lib/utils/convert'),
    convert = new Convert();

/* Tests */

describe('Convert', function() {
  var test = {
    line: ['<!-- @include content.html -->'],
    lines: ['<body>', '<p>This is a test.</p>', '</body>']
  };

  describe('.line()', function() {
    it('must convert the line into a string', function() {
      var content = convert.line(test.line);
      content.must.be('<!-- @include content.html -->');
    });
  });

  describe('.lines()', function() {
    it('must convert the lines into a string with linebreaks', function() {
      var content = convert.lines(test.lines);
      content.must.be('<body>\n<p>This is a test.</p>\n</body>');
    });
  });
});
