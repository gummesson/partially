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
        'test/convert-test.js',
        'test/replace-test.js',
        'test/file-test.js',
        'test/partially-test.js'
      ],

      tmp: [
        'test/tmp',
        'test/fixtures/output'
      ]
    },

    build: {
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
    },

    docs: {
      src: [
        'lib/partially.js',
        'lib/utils/get.js',
        'lib/utils/convert.js',
        'lib/utils/replace.js',
        'lib/utils/file.js'
      ],
      dest: 'tmp/index.js',
      build: 'docco --output site/docs tmp/index.js'
    },

    sass: {
      src: 'assets/sass/style.scss',
      dest: 'assets/css/style.css'
    },

    site: {
      build: 'geno'
    }
  };

  grunt.initConfig({
    project: project,

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
        src: project.build.tmp
      }
    },

    concat: {
      js: {
        src: project.docs.src,
        dest: project.docs.dest,
        nonull: true
      }
    },

    sass: {
      build: {
        options: {
          style: 'compressed'
        },

        files: {
          '<%= project.sass.dest %>' : '<%= project.sass.src %>'
        }
      }
    },

    shell: {
      html: {
        options: {
          stdout: true
        },
        command: project.build.html
      },

      haml: {
        options: {
          stdout: true
        },
        command: project.build.haml
      },

      jade: {
        options: {
          stdout: true
        },
        command: project.build.jade
      },

      markdown: {
        options: {
          stdout: true
        },
        command: project.build.markdown
      },

      docs: {
        options: {
          stdout: true
        },
        command: project.docs.build
      },

      site: {
        options: {
          stdout: true
        },
        command: project.site.build
      }
    },

    copy: {
      site: {
        files: [{
          expand: true,
          cwd:'site/',
          src: ['**'],
          dest: '../docs/'
        }]
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'simplemocha',
    'clean:test'
  ]);

  grunt.registerTask('build', [
    'clean:examples',
    'shell:html',
    'shell:haml',
    'shell:jade',
    'shell:markdown'
  ]);

  grunt.registerTask('site', [
    'concat',
    'shell:docs',
    'sass',
    'shell:site',
    'copy'
  ]);

  grunt.registerTask('default', [
    'test'
  ]);

};
