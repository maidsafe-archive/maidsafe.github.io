module.exports = function(grunt) {
  var gitHelper;
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-prompt');

  var selectedPR;
  var OPTION_ISSUE_KEY = 'pr.key';
  var BRANCH_KEY = 'local_branch';

  var CONFIG = {
    owner: 'maidsafe',
    repo: 'maidsafe.github.io',
    baseBranch: 'master'
  };

  gitHelper = new require('./grunt_helper/github').Helper();
  grunt.initConfig({

    // grunt-contrib-connect will serve the files of the project
    // on specified port and hostname
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: "0.0.0.0",
          // No need for keepalive anymore as watch will keep Grunt running
          //keepalive: true,
          // Livereload needs connect to insert a cJavascript snippet
          // in the pages it serves. This requires using a custom connect middleware
          middleware: function(connect, options) {
            return [
              function(req, res, next) {
                var urlSplitted = req.url.split('/');
                if (urlSplitted[urlSplitted.length - 1] && urlSplitted[urlSplitted.length - 1].split('.').length === 1) {
                  req.url += '.html';
                }
                next();
              },
              // Load the middleware provided by the livereload plugin
              // that will take care of inserting the snippet,
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              // Serve the project folder
              connect.static(options.base + '/')
            ];
          }
        }
      }
    },
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },

    // grunt-regarde monitors the files and triggers livereload
    // livereload complains when you try to use grunt-contrib-watch instead of grunt-regarde
    regarde: {
      all: {
        files:['**/*.js', '**/*.css', '**/*.html'],
        // This configures the task that will run when the file change
        tasks: ['livereload']
      }
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

  grunt.registerTask('clean', [
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
    'livereload-start',
    'connect',
    'open',
    'regarde'
  ]);

  grunt.registerTask('default', [
    'exec:gitCheckout:' + CONFIG.baseBranch,
    'exec:gitPull',
    'livereload-start',
    'connect',
    'open',
    'regarde'
  ]);

  grunt.registerTask('serve', [
    'exec:gitStatus',
    'livereload-start',
    'connect',
    'open',
    'regarde'
  ]);
};
