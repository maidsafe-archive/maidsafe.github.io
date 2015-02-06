// Generated on 2015-02-03 using generator-jekyllrb 1.4.1
'use strict';

// Directory reference:
//   css: css
//   javascript: js
//   images: img
//   fonts: fonts

module.exports = function (grunt) {
  var selectedPR;
  var gitHelper;
  var OPTION_ISSUE_KEY = 'pr.key';
  var BRANCH_KEY = 'local_branch';

  var CONFIG = {
    owner: 'krishnaindia',
    repo: 'krishnaindia.github.io',
    baseBranch: 'master'
  };

  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-prompt');

  gitHelper = new require('./grunt_helper/github').Helper();

  grunt.initConfig({
    // Configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      autoprefixer: {
        files: ['<%= yeoman.app %>/css/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:dist']
      },
      jekyll: {
        files: [
          '<%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
          '!<%= yeoman.app %>/_bower_components/**/*'
        ],
        tasks: ['jekyll:server']
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/css/**/*.css',
            '{.tmp,<%= yeoman.app %>}/js/**/*.js',
            '{<%= yeoman.app %>}/_bower_components/**/*.js',
            '<%= yeoman.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
          ]
        },
        options: {
          server: {
            baseDir: [
              '.jekyll',
              '.tmp',
              '<%= yeoman.app %>'
            ],
            middleware: function (req, res, next) {
              var urlSplitted = req.url.split('/');
              if (urlSplitted[urlSplitted.length - 1] && urlSplitted[urlSplitted.length - 1].split('.').length === 1) {
                req.url += '.html';
              }
              next();
            }
          },
          watchTask: true
        }
      },
      dist: {
        options: {
          server: {
            baseDir: '<%= yeoman.dist %>',
            middleware: function (req, res, next) {
              var urlSplitted = req.url.split('/');
              if (urlSplitted[urlSplitted.length - 1] && urlSplitted[urlSplitted.length - 1].split('.').length === 1) {
                req.url += '.html';
              }
              next();
            }
          }
        }
      },
      test: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/css/**/*.css',
            '{.tmp,<%= yeoman.app %>}/js/**/*.js',
            '{<%= yeoman.app %>}/_bower_components/**/*.js',
            '<%= yeoman.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
          ]
        },
        options: {
          server: {
            baseDir: [
              '.jekyll',
              '.tmp',
              '<%= yeoman.app %>'
            ]
          },
          watchTask: true
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ],
      bundler: [
        '<%= yeoman.dist %>/bundler.html'
      ]
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        expand: true,
        cwd: '.tmp',
        src: '**/{css,concat}/*.css',
        dest: '.tmp'
      }
    },
    jekyll: {
      options: {
        config: '_config.yml,_config.build.yml',
        src: '<%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%= yeoman.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: ['<%= yeoman.dist %>/bundler.html']
    },
    usemin: {
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/img']
      },
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/css/**/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['**/*.svg', '!**/fonts/**'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            // Jekyll processes and moves HTML and text files.
            // Usemin moves CSS and javascript inside of Usemin blocks.
            // Copy moves asset files and directories.
            'img/**/*',
            'fonts/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore.
            '!**/_*{,/**}'
            // Explicitly add any files your site needs for distribution here.
            //'_bower_components/jquery/jquery.min.js',
            //'favicon.ico',
            //'apple-touch*.png'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      },
      // Copy CSS into .tmp directory for Autoprefixer processing
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/css',
          src: '**/*.css',
          dest: '.tmp/css'
        }]
      }
    },
    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            '<%= yeoman.dist %>/js/**/*.js',
            '<%= yeoman.dist %>/css/**/*.css',
            '<%= yeoman.dist %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%= yeoman.dist %>/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }]
      }
    },
    buildcontrol: {
      dist: {
        options: {
          dir: 'dist',
          remote: 'git@github.com:' + CONFIG.owner + '/' + CONFIG.repo + '.git',
          branch: 'gh-pages',
          commit: true,
          push: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/js/*.js',
        'test/spec/**/*.js'
      ]
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%= yeoman.app %>/css/**/*.css'
        ]
      }
    },
    // https://github.com/robwierzbowski/generator-jekyllrb/issues/106
    // scsslint: {
    //   // See https://www.npmjs.org/package/grunt-scss-lint for options.
    //   allFiles: [
    //     '<%= yeoman.app %>/_scss/**/*.scss'
    //   ]
    // },
    concurrent: {
      server: [
        'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        'copy:dist'
      ]
    },
    prompt: {
      pr: {
        options: {
          questions: [
            {
              config: OPTION_ISSUE_KEY, // arbitrary name or config for any other grunt task
              type: 'list', // list, checkbox, confirm, input, password
              message: 'Select the PR to build', // Question to ask the user, function needs to return a string,
              choices: function() {
                return gitHelper.getOpenPRList(CONFIG.owner, CONFIG.repo);
              }
            }
          ]
        }
      },
      clean: {
        options: {
          questions: [
            {
              config: BRANCH_KEY, // arbitrary name or config for any other grunt task
              type: 'list', // list, checkbox, confirm, input, password
              message: 'Select the Branch to delete', // Question to ask the user, function needs to return a string,
              choices: function() {
                return gitHelper.getLocalBranches();
              }
            }
          ]
        }
      }
    },
    exec: {
      gitCheckout: {
        cmd: function(branch) {
          return gitHelper.CLI.checkout(branch || selectedPR);
        }
      },
      gitPullForPR: {
        cmd: function() {
          return gitHelper.pullForPR(selectedPR);
        }
      },
      gitPull: {
        cmd: gitHelper.CLI.pull
      },
      gitBranch: {
        cmd: function(branch) {
          return gitHelper.CLI.branch(branch || selectedPR);
        },
        exitCode : [0, 128]
      },
      gitBranchList: {
        cmd: 'git branch',
        callback: gitHelper.branchListHandler
      },
      gitDeleteBranch: {
        cmd: function() {
          return 'git branch -D ' + grunt.config(BRANCH_KEY);
        }
      },
      gitStatus: {
        cmd: 'git status'
      },
      echoSelection: {
        cmd: function() {
          selectedPR = grunt.config(OPTION_ISSUE_KEY);
          if (selectedPR && selectedPR !== 'undefined') {
            return 'echo PR Selected - ' + selectedPR;
          }
          return 'echo PR not selected && exit 1';
        }
      }
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer:dist',
      'browserSync:server',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  // No real tests yet. Add your own.
  grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'browserSync:test'
    'jshint:all'
  ]);

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'jshint:all',
    'csslint:check'
    // 'scsslint'
  ]);

  grunt.registerTask('build', [
    'clean',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'cssmin',
    'autoprefixer:dist',
    'uglify',
    'imagemin',
    'svgmin',
    'filerev',
    'usemin',
    'clean:bundler',
    'htmlmin'
    ]);

  grunt.registerTask('deploy', [
   // 'check', // this is commented because it breaks on windows, to be supported soon
    'test',
    'build',
    'buildcontrol'
    ]);

  grunt.registerTask('clean-branch', [
    'exec:gitCheckout:' + CONFIG.baseBranch,
    'exec:gitBranchList',
    'prompt:clean',
    'exec:gitDeleteBranch'
    ]);

  grunt.registerTask('pr', [
    'prompt:pr',
    'exec:echoSelection',
    'exec:gitCheckout:' + CONFIG.baseBranch,
    'exec:gitPull',
    'exec:gitBranch',
    'exec:gitCheckout',
    'exec:gitPullForPR',
    'clean:server',
    'concurrent:server',
    'autoprefixer:dist',
    'browserSync:server',
    'watch'
    ]);
  /*
   * Checks out to latest master branch and serves files
   */
  grunt.registerTask('default', [
    'exec:gitCheckout:' + CONFIG.baseBranch,
    'exec:gitPull',
    'clean:server',
    'concurrent:server',
    'autoprefixer:dist',
    'browserSync:server',
    'watch'
    ]);
};
