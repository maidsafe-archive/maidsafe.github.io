var request = require('request-sync');

exports.API = function(accessToken) {
  var instance = this;
  var USER_AGENT = 'maidsafe-pr-grunt';

  var getHeaders = function() {
    var headers = {'User-Agent': USER_AGENT};
    if (accessToken) {
      headers['Authorization'] = 'token ' + accessToken
    }
    return headers;
  };

  instance.getOpenPRList = function(owner, repo) {
    var PR_LIST_URL = 'https://api.github.com/repos/' + owner + '/' + repo + '/pulls?state=open';
    return request(PR_LIST_URL, {method: 'GET', headers: getHeaders()});
  };

};
