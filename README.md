node-newrelic-webapi
=========================
[![Travis](https://travis-ci.org/marcellodesales/node-newrelic-webapi.svg)](https://travis-ci.org/marcellodesales/node-newrelic-webapi)
[![Dependency Status](https://david-dm.org/maboiteaspam/node-newrelic-webapi.svg)](https://david-dm.org/maboiteaspam/node-newrelic-webapi)

Node.js bindings for the New Relic XML and RESTFul APIs into a single one.

[![NPM](https://nodei.co/npm/node-newrelic-webapi.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-newrelic-webapi/)

Description
========

New Relic provides some of their APIs through XML or RESTful JSON endpoints, but they use different hosts, methods. 
This is a consolidated API that intends to provide bindings to their Public APIs in Node.js.

* Async: Useful when implementing anything in the event loop for your app.

The APIs added per version are as follows:

| Version | Feature
|-------  | ---------
| 0.1.1   | * Deployments: Caches the application deployment 
| -----   | --------
| 0.1.0   | * *Accounts*: Retrieve account information; (XML v1 API)
|         | * *Application*: Retrieve application information; (JSON V2 API)
|         | * *Deployments*: Submits application deployment information. (XML V1 API)

Installation
=========

```
npm install node-newrelic-webapi --save
```

Accounts API
===========

The XML V1 API binds that retrieves information about an account.

* https://docs.newrelic.com/docs/apm/apis/new-relic-rest-api-v1/getting-started-new-relic-rest-api-v1#account_id

Accounts.get(opts, callback)
-----------

Retrieves the account information based on the license information.

```js
  opts: {
    appKey: {string} // The license key provided by New Relic.
  }

  /**
   * @param {object} err Is the possible error related to connectivity with New Relic.
   * @param {object} AccountInfo Is the object information translated from XML V1 API to JSON.
   */
  function callback(err, account) { }
```

Sample
-----------

```js
AccountInfo = 
{ name: 'Node.js App',
  subscription: 
   { state: 'paid',
     annualRenewalOn: '2015-09-30',
     startsOn: '2014-01-17',
     productName: 'Enterprise Annual'
  },
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  dataAccessKey: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
  licenseKey: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
  eventFeedUri: '/account_feeds/cccccccccccccccccccccccccccccccccc/events.rss',
  primaryAdmin: 
   { email: 'admin@example.com',
     state: 'active',
     firstName: 'Marcello',
     lastName: 'de Sales' 
   } 
}
```

Application API
===========

The JSON V2 API binds that retrieves information about an application. (Lists on next versions)

* https://docs.newrelic.com/docs/apm/apis/api-explorer-v2/getting-started-new-relics-api-explorer

Applications.get(opts, callback)
-----------

Retrieves the application information based on the license information and the name of an app.

```js
  opts: {
    appKey: {string}, // The license key provided by New Relic.
    appName: {string} // The name of the application that you have deployed.
  }

  /**
   * @param {object} err Is the possible error related to connectivity with New Relic.
   * @param {object} AccountInfo Is the object information translated from XML V1 API to JSON.
   */
  function callback(err, app) { }
```

Sample
------

Sample for the application info:

```js
ApplicationInfo =
{ id: xyxyxyxyxyx,
  name: 'nodejs-sample',
  language: 'nodejs',
  health_status: 'gray',
  reporting: false 
}
```

Deployments
============

Provides an API to support the submission of deployments, retrieving the deployment info.

More info at https://rpm.newrelic.com/accounts/xxxxxxx/applications/yyyyyyyy/deployments/instructions

Deployments.get(opts, callback)
-----------

Retrieves the deployment information based on the license information and the name of an app.

```js
  opts: {
    appKey: {string}, // The license key provided by New Relic.
    appName: {string} // The name of the application that you have deployed.
    git: {object} // The git object with current version  //
  }

  /**
   * @param {object} err Is the possible error related to connectivity with New Relic.
   * @param {object} deployment Is the object containing the information from XML V1 API to JSON.
   */
  function callback(err, deployment) { }
```

Sample
------

Sample for the application info:

```js
{ id: 'xyxyxyxyx',
  appName: 'nodejs-sample',
  accountId: '0000000',
  agentId: 'zdzdzd',
  changelog: '[First working version] .',
  description: 'Submitted from mdesales@ubuntu (192.168.248.137).',
  revision: '670383',
  timestamp: '2014-12-02T00:53:02-08:00',
  user: 'user' 
} 
```

Installation
=========

```
npm install --save node-newrelic-webapi
```

Use
=========

The test directory contains examples on how to call the API. You will need to use:

* `LICENSE_KEY`: Your license Key provided by your account.
* `App Name`: Usually the name of the app based on the package.json.
