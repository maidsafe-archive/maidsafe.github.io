var CLI = function() {
  var instance = this;

  var parseBranchName = function(branchName) {
    return branchName.replace(/ /g, '_');
  };
  instance.clone = function(owner, repo) {
    return 'git clone https://github.com/' + owner + '/' + repo + '.git';
  };
  instance.checkout = function(branchName, createBranch) {
    var cmd = 'git checkout ';
    if (createBranch) {
      cmd += '-b '
    }
    cmd += parseBranchName(branchName);
    return  cmd;
  };
  instance.branch = function(branchName) {
    return 'git branch ' + parseBranchName(branchName);
  };
  instance.pull = function(branch) {
    var cmd = 'git pull ';
    if (branch) {
      cmd += branch;
    }
    return cmd;
  };
  instance.pullRemote = function(remoteRepo, branch) {
    return 'git pull ' + remoteRepo + ' ' + branch;
  };
};
exports.CLI = CLI;
