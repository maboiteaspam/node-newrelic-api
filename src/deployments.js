/** @module Deployments */

var restify = require('restify');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser();

var utils = require('../').utils;


/**
 * Based on https://rpm.newrelic.com/accounts/xxxxx/applications/yyyyyy/deployments/instructions',
 * we can submit information about deployments by posting a request to the server using the module.
 * The API is described at
 * https://docs.newrelic.com/docs/apm/apis/new-relic-rest-api-v1/getting-started-new-relic-rest-api-v1#account_id
 */
/**
 *
 * @example opt
 * opt = {
        app: {
          id: 'xxxx',
          name: 'xxxx'
        },
        apiKey: 'xxxxx',
        description: '',
        revision: '',
        changelog: ''
      }
 *
 *
 * @example deployRecord
 * deployRecord = {
        id: deployment.id,
        appName: opt.app.name,
        accountId: deployment.accountId,
        agentId: deployment.agentId,
        changelog: deployment.changelog,
        description: deployment.description,
        revision: deployment.revision,
        timestamp: deployment.timestamp,
        user: deployment.user
      }
 *
 *
 * @example Curl
 *   curl -H "x-api-key:REPLACE_WITH_YOUR_API_KEY" \
 *   -d "deployment[app_name]=REPLACE_WITH_YOUR_APP_NAME" \
 *   -d "deployment[description]=This is an app id deployment" \
 *   https://api.newrelic.com/deployments.xml
 *
 *
 * @param {Object} opt
 * @param {Function} callback (err, deployRecord)
 */
module.exports.get = function (opt, callback) {
  if (!opt.app || !opt.app.id) {
    throw new Error('You must provide the app with its id');
  }

  // client HTTP headers
  var headers = {};
  headers['x-api-key'] = opt.apiKey;

  // HTTP client object
  var client = restify.createStringClient({
    url: 'https://api.newrelic.com',
    headers: headers
  });

  var formData = {};
  formData['deployment[application_id]'] = opt.app.id;
  formData['deployment[description]'] = opt.description;
  formData['deployment[revision]'] = opt.revision;
  formData['deployment[changelog]'] = opt.changelog;
  formData['deployment[user]'] = process.env.USER;

  // The request opjects
  client.post('/deployments.xml', formData, function (err, req, res, deploymentXml) {
    if (err) {
      throw new Error('API ERROR:' + err);
    }
    // Close the connection with the client.
    client.close();

    // Parse the xml output from the server.
    xmlParser.parseString(deploymentXml, function (err, deploymentJson) {
      if (err) {
        return callback(err, null);
      }
      // stringify it and parse it back https://github.com/Leonidas-from-XIV/node-xml2js#so-you-wanna-some-json
      var json = JSON.stringify(deploymentJson.deployment);
      var deployment = JSON.parse(json);

      // transform array objects into strings when possible 'my-account-number' -> myAccountNumber
      utils.camelizeProperties(deployment);

      var deployRecord = {
        id: deployment.id,
        appName: opt.app.name,
        accountId: deployment.accountId,
        agentId: deployment.agentId,
        changelog: deployment.changelog,
        description: deployment.description,
        revision: deployment.revision,
        timestamp: deployment.timestamp,
        user: deployment.user
      };

      callback(null, deployRecord);
    });
  });
};

