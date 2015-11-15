// Generated on 2015-02-03 using generator-jekyllrb 1.4.1
/* global escape */

'use strict';

// Directory reference:
//   css: css
//   javascript: js
//   images: img
//   fonts: fonts

module.exports = function (grunt) {
  var selectedPR;
  var gitHelper;
  var URI = require('URIjs');
  var OPTION_ISSUE_KEY = 'pr.key';
  var BRANCH_KEY = 'local_branch';
  var TEST_PORT = grunt.option('testPort') || 8000;
  var CONFIG = {
    owner: 'maidsafe',
    repo: 'maidsafe.github.io',
    baseBranch: 'next',
    deployBranch: 'master'
  };

  var customMiddleware = function (req, res, next) {
    var urlSplitted = req.url.split('/');
    if (urlSplitted[urlSplitted.length - 1] && urlSplitted[urlSplitted.length - 1].split('.').length === 1) {
      req.url += '.html';
    }
    next();
  };

  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

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
            middleware: customMiddleware
          },
          watchTask: true
        }
      },
      dist: {
        options: {
          server: {
            baseDir: '<%= yeoman.dist %>',
            middleware: customMiddleware
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
          branch: CONFIG.deployBranch,
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
    'link-checker': {
      options: {
        maxConcurrency: 20,
        noFragment: true
      },
      dev: {
        site: 'localhost',
        options: {
          initialPort: TEST_PORT,
          callback: function(crawler) {
            crawler.supportedMimeTypes = [
              /^text\//i,
              /^application\/(rss|html|xhtml)?[\+\/\-]?xml/i,
              /^xml/i
            ];
            crawler.domainWhitelist = [
              'github.com',
              'forum.safenetwork.io'
            ];
            crawler.discoverResources = function(resourceData, queueItem) {
              // Convert to UTF-8
              // TODO: account for text-encoding.
              var resources = [],
              resourceText = resourceData.toString('utf8');

              if (!queueItem) {
                queueItem = {};
              }

              if (!queueItem.protocol) {
                queueItem.protocol = 'http';
              }

              if (!crawler.parseHTMLComments) {
                resourceText = resourceText.replace(/<!--([\s\S]+?)-->/g, '');
              }

              if (!crawler.parseScriptTags) {
                resourceText = resourceText.replace(/<script(.*?)>([\s\S]+?)<\/script>/gi, '');
              }

              function cleanURL(URL) {
                return URL
                .replace(/^(\s?href|\s?src)=['"]?/i,'')
                .replace(/^\s*/,'')
                .replace(/^url\(['"]*/i,'')
                .replace(/^javascript\:[a-z0-9]+\(['"]/i,'')
                .replace(/["'\)]$/i,'')
                .replace(/^\/\//, queueItem.protocol + '://')
                .replace(/\&amp;/gi,'&')
                .split('#')
                .shift();
              }

              // Clean links
              function cleanAndQueue(urlMatch) {
                if (!urlMatch) {
                  return [];
                }

                return urlMatch
                .map(cleanURL)
                .reduce(function(list,URL) {

                  // Ensure URL is whole and complete
                  try {
                    URL = URI(URL)
                    .absoluteTo(queueItem.url)
                    .normalize()
                    .toString();
                  } catch(e) {

                    // But if URI.js couldn't parse it - nobody can!
                    return list;
                  }

                  // If we hit an empty item, don't add return it
                  if (!URL.length) {
                    return list;
                  }

                  // If we don't support the protocol in question
                  if (!crawler.protocolSupported(URL)) {
                    return list;
                  }

                  // Does the item already exist in the list?
                  if (resources.reduce(function(prev,current) {
                    return prev || current === URL;
                  },false)) {
                      return list;
                  }

                  return list.concat(URL);
                },[]);
              }


              if (queueItem.host !== 'localhost') {
                var referrerHost = cleanURL(queueItem.referrer.
                  match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1]);
                if (referrerHost === 'localhost' || referrerHost !== 'localhost' ) {
                  return [];
                }
              }

              // Rough scan for URLs
              return crawler.discoverRegex
              .reduce(function(list,regex) {
                return list.concat(
                  cleanAndQueue(
                    resourceText.match(regex)));
                  },[])
                  .reduce(function(list,check) {
                    if (list.indexOf(check) < 0) {
                      return list.concat([check]);
                    }

                    return list;
                  },[]);
                };
              }
            }
          }
        },
        connect: {
          serve: {
            options: {
              port: TEST_PORT,
              middleware: function(connect, options, middlewares) {
                middlewares.unshift(customMiddleware);
                return middlewares;
              },
              base: [
                '.jekyll',
                '.tmp',
                '<%= yeoman.app %>'
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
                return 'echo PR Selected - ' + escape(selectedPR).replace(/%20/g, ' ');
              }
              return 'echo PR not selected && exit 1';
            }
          },
          updateDependencies: {
            cmd: 'npm prune && npm install && bower install'
          }
        },
        htmllint: {
          options: {
            ignore: [
              'Consider using the "h1" element as a top-level heading only (all "h1" elements are ' +
              'treated as top-level headings by many screen readers and other tools).',
              'Element "dl" is missing a required child element.',
              'Element "div" not allowed as child of element "span" in this context. ' +
              '(Suppressing further errors from this subtree.)'
            ]
          },
          all: ['.jekyll/*.html', '!.jekyll/404.html']
        },
        jscs: {
          src: 'app/js/*.js',
          options: {
            config: '.jscsrc'
          }
        }
      });

      /**
      * serve - Serve the files
      * serve:dist - will serve the contents from the dist folder
      */
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

      /**
      * grunt test - to run the test suite for js linters, broken links and  w3c validators
      */
      grunt.registerTask('test', [
        'clean:server',
        'concurrent:server',
        'connect:serve',
        'jshint:all',
        'jscs',
        'link-checker',
        'htmllint'
      ]);

      //grunt.registerTask('check', [
      //  'clean:server',
      //  'jekyll:check', // this breaks on windows, to be supported soon
      //  'jshint:all',
      //  'csslint:check'
      //  // 'scsslint'
      //]);

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

      /**
      * Builds and Deploys in the deployBranch from the configuration
      */
      grunt.registerTask('deploy', [
        // 'check',
        'test',
        'build',
        'buildcontrol'
      ]);

      /**
      * List the local branches for deleting
      *
      */
      grunt.registerTask('clean-branch', [
        'exec:gitCheckout:' + CONFIG.baseBranch,
        'exec:gitBranchList',
        'prompt:clean',
        'exec:gitDeleteBranch',
        'exec:updateDependencies'
      ]);

      /**
      * Lists the open Pull Requests from the configured repository.
      * On selection of the PR the branch is checked  out and merged with the latest master branch and serves the site.
      */
      grunt.registerTask('pr', [
        'prompt:pr',
        'exec:echoSelection',
        'exec:gitPullForPR',
        'exec:updateDependencies',
        'serve:dist'
      ]);

      /**
      * Checks out to the latest master branch and serves files
      */
      grunt.registerTask('default', [
        'exec:gitCheckout:' + CONFIG.baseBranch,
        'exec:gitPull',
        'serve'
      ]);
    };
