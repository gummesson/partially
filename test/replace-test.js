/* Modules */

var must    = require('must'),
    Replace = require('../lib/utils/replace'),
    replace = new Replace();

/* Tests */

describe('Replace', function() {
  var test = {
    tag: '<!-- content.html -->',
    partial: '<p>This is a test.</p>'
  };

  it('must replace the tag with the partial', function() {
    var content = replace.content(test.tag, test.partial);
    content.must.be('<p>This is a test.</p>');
  });
});
