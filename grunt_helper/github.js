var GithubAPI = require('./github.api');
var GitCLI = require('./github.cli');
exports.Helper = function(accessToken) {
  var api;
  var instance;
  var openPR = {};
  var branches = [];
  instance = this;
  api = new GithubAPI.API(accessToken);
  var parseOpenPRList = function(openPRList) {
    openPRList = JSON.parse(openPRList.body);
    for (var i in openPRList) {
      if (!openPRList[i].title) {
        continue;
      }
      openPR[openPRList[i].title] = openPRList[i];
    }
  };
  var getOpenPRTitles = function() {
    var list = [];
    for (var key in openPR) {
      if (!key) {
        continue;
      }
      list.push(key);
    }
    return list;
  };
  instance.CLI = new GitCLI.CLI();
  instance.getOpenPRList = function(owner, repo) {
    console.log('Fetching PR list for %s/%s', owner, repo);
    var openPRList = api.getOpenPRList(owner, repo);
    var list;
    if (openPRList.statusCode !== 200) {
      throw 'Fetching open PR list failed with Status code - ' + openPRList.statusCode;
    }
    parseOpenPRList(openPRList);
    list = getOpenPRTitles();
    if (list.length === 0) {
      console.error('No Open PR Available');
      throw 'No open PR Available';
    }
    return list;
  };
  instance.pullForPR = function(selectedPR) {
    if (!openPR.hasOwnProperty(selectedPR)) {
      return 'echo pull failed -  PR not found for selection && exit 1';
    }
    return instance.CLI.checkout(openPR[selectedPR].base.ref) + '&&' + instance.CLI.pull() + '&&' +
      instance.CLI.checkout(openPR[selectedPR].user.login + '_' + openPR[selectedPR].head.ref, true) + '&&' +
      instance.CLI.pullRemote(openPR[selectedPR].head.repo.clone_url, openPR[selectedPR].head.ref);
  };
  instance.branchListHandler = function(stdIn, stdOut, err) {
    if (err) {
      return 'echo Failed to list local branches && exit 1';
    }
    var list = stdOut.split('\n');
    for (var i in list) {
      if (!list[i] || list[i].indexOf('*') === 0) {
        continue;
      }
      branches.push(list[i].trim());
    }
  };
  instance.getLocalBranches = function() {
    return branches;
  };
  return instance;
};
