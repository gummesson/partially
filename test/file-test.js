/* Modules */

var must     = require('must'),
    fsExists = require('./helpers/fs-exists'),
    File     = require('../lib/utils/file'),
    file     = new File();

/* Tests */

describe('File', function() {
  var path = {
    output: 'test/tmp',
    file: 'test/tmp/test.txt'
  };

  var test = {
    content: 'Hello world!'
  };

  describe('.mkDir()', function() {
    it('must create the directory', function(done) {
      file.mkDir(path.output, function(err) {
        if (err) { throw err; }
        fsExists('test/tmp').must.be.true();
        done();
      });
    });
  });

  describe('.save()', function() {
    it('must save the file', function(done) {
      file.save(path.file, test.content, function(err) {
        if (err) { throw err; }
        fsExists('test/tmp/test.txt').must.be.true();
        done();
      });
    });
  });

  describe('.read()', function() {
    it('must read the file', function(done) {
      file.read(path.file, function(err, data) {
        if (err) { throw err; }
        data.must.exist();
        data.must.be('Hello world!');
        done();
      });
    });
  });
});
