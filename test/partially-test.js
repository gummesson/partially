/* Modules */

var must      = require('must'),
    fs        = require('fs'),
    fsExists  = require('./helpers/fs-exists'),
    Partially = require('../lib/partially');

/* Tests */

describe('Partially', function() {
  var path = {
    file: 'test/fixtures/template/index.html',
    partials: 'test/fixtures/partials',
    output: 'test/fixtures/output',
    outputFile: 'test/fixtures/output/index.html'
  };

  var test =  {
    content: [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="utf-8">',
      '  <title>Test</title>',
      '</head>',
      '<body>',
      '  <p>This is a test.</p>',
      '</body>',
      '</html>\n'
    ].join('\n')
  };

  describe('.render()', function() {
    it('must generate the all of the content', function(done) {
      Partially(path.file, path.partials, path.output).render(function(err, file, content) {
        if (err) { throw err; }
        content.must.exist();
        content.must.be(test.content);
        done();
      });
    });
  });

  describe('.compile()', function() {
    it('must generate the output file', function(done) {
      Partially(path.file, path.partials, path.output).compile(function(err, file) {
        if (err) { throw err; }
        fsExists('test/fixtures/output/index.html').must.be.true();
        done();
      });
    });

    it('must generate all of the content in the output file', function(done) {
      fs.readFile(path.outputFile, {encoding: 'utf8'}, function(err, data) {
        if (err) { throw err; }
        data.must.exist();
        data.must.be(test.content);
        done();
      });
    });
  });
});
