module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var project = {
    js: {
      hint: [
        'Gruntfile.js',
        'bin/**/*.js',
        'lib/**/*.js',
        'test/**/*.js'
      ],

      test: [
        'test/get-test.js',
        'test/replace-test.js',
        'test/file-test.js',
        'test/partially-test.js'
      ],

      tmp: [
        'test/tmp',
        'test/fixtures/output'
      ]
    },

    cmd: {
      html: 'cd examples/html && partially',
      haml: 'cd examples/haml && partially -f template/index.haml',
      jade: 'cd examples/jade && partially -f template/index.jade',
      markdown: 'cd examples/markdown && partially -f template/index.md',

      tmp: [
        'examples/haml/output',
        'examples/html/output',
        'examples/jade/output',
        'examples/markdown/output'
      ]
    }
  };

  grunt.initConfig({
    jshint: {
      files: project.js.hint
    },

    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'spec'
      },

      all: {
        src: project.js.test
      }
    },

    clean: {
      test: {
        src: project.js.tmp
      },

      examples: {
        src: project.cmd.tmp
      },
    },

    shell: {
      html: {
        options: {
          stdout: true
        },
        command: project.cmd.html
      },

      haml: {
        options: {
          stdout: true
        },
        command: project.cmd.haml
      },

      jade: {
        options: {
          stdout: true
        },
        command: project.cmd.jade
      },

      markdown: {
        options: {
          stdout: true
        },
        command: project.cmd.markdown
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'simplemocha', 'clean:test']);
  grunt.registerTask('build', ['clean:examples', 'shell']);
  grunt.registerTask('default', ['test']);

};
