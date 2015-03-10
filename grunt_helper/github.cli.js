var CLI = function() {
  var instance = this;

  instance.parseBranchName = function(branchName) {
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
    cmd += instance.parseBranchName(branchName);
    return  cmd;
  };
  instance.branch = function(branchName) {
    return 'git branch ' + instance.parseBranchName(branchName);
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
