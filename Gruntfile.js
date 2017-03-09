module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    concat: {
      basic_and_extras: {
        files: {
          'public/dist/build.js':
          ['public/client/app.js', 'public/client/link.js', 'public/client/links.js', 'public/client/linkView.js',
           'public/client/linksView.js', 'public/client/createLinkView.js', 'public/client/router.js'],
           'public/dist/lib.js':
           ['public/lib/jquery.js', 'public/lib/underscore.js', 'public/lib/backbone.js', 'public/lib/handlebars.js']
        },
      },
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/build.min.js': 'public/dist/build.js',
          'public/dist/lib.min.js': 'public/dist/lib.js',
        }
      }
    },

    eslint: {
      target: ['public/client/*.js', 'app/**/*.js', 'lib/*.js']
    },

    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': 'public/style.css'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    clean: {
      js: ["public/dist/*.js", "!public/dist/*.min.js"]
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'eslint',
    'mochaTest',
    'concat',
    'uglify',
    'cssmin',
    'clean'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run([ 'build' ]);
      grunt.task.run([ 'shell' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'build', 'test', 'upload'
  ]);

};
