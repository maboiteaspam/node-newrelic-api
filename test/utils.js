var utils = require("../").utils;

var hostname = utils.getHostname();

console.log("Your Hostname: " + hostname);

utils.getGitHeadSHA(function(headCommitSha){
  console.log("Head SHA: " + JSON.stringify(headCommitSha));
});

