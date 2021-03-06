/* Modules */

var must = require('must'),
    join = require('path').join,
    Get  = require('../lib/utils/get'),
    get  = new Get();

/* Tests */

describe('Get', function() {
  var path = {
    file: 'template/index.html',
  };

  var test = {
    lines: [
      '<p>Test.</p>',
      '<!-- @include content.html -->',
      '<!-- Comment -->'
    ].join('\n'),
    tag: '<!-- @include content.html -->'
  };

  describe('.path()', function() {
    it('must get the path', function() {
      var filepath = get.path(path.file),
          realpath = join(process.cwd(), '/', 'template/index.html');
      filepath.must.be(realpath);
    });
  });

  describe('.filename()', function() {
    it('must get the filename', function() {
      var filename = get.filename(path.file);
      filename.must.be('index.html');
    });
  });

  describe('.lines()', function() {
    it('must get all lines into an array', function() {
      var lines = get.lines(test.lines);
      lines.must.eql([
        '<p>Test.</p>',
        '<!-- @include content.html -->',
        '<!-- Comment -->'
      ]);
    });
  });

  describe('.partialTag()', function() {
    it('must get the partial tag', function() {
      var tag = get.partialTag(test.lines);
      tag.must.eql(['<!-- @include content.html -->']);
    });
  });

  describe('.partialName()', function() {
    it('must get the partial filename', function() {
      var name = get.partialName(test.tag);
      name.must.be('content.html');
    });
  });
});
