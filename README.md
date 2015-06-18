[![Build Status](https://travis-ci.org/trylinear/linear.svg)](https://travis-ci.org/trylinear/linear)
[![Code Climate](https://codeclimate.com/github/trylinear/linear/badges/gpa.svg)](https://codeclimate.com/github/trylinear/linear)
[![Dependency Status](https://david-dm.org/trylinear/linear.svg?style=flat)](https://david-dm.org/trylinear/linear/)
[![devDependency Status](https://david-dm.org/trylinear/linear/dev-status.svg?style=flat)](https://david-dm.org/trylinear/linear/#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/linear.svg?style=flat)](https://www.npmjs.org/package/linear/)

# linear

> A simple setup micro-forum built in Node.js with Express and MongoDB.

## Install

```bash
$ npm install linear --save
```

## Quick Start

```javascript
var linear = require('linear');

linear.startWithConfig({
    'site_name': 'Sample Forum'
});
```

## Config

### site_name

Type: `String`  
Default: `'Sample Forum'`

Name used in both `header` and `title` tags throughout the site.

### directories

Type: `Object`  
Default: `{ 'static': './static' }`

Directories used to overwrite the assets included with linear.

- `static`: All static files: CSS, Fonts, JavaScript
- `locales`: Localization files.
- `views`: Server-side templates.

Note: Replacing the `locales` directory is a destructive action. Changing `static` or `views` is a additive action as the server will look for static files and view templates in the config specified directories first.

### ga

Type: `String`  
Default: `''`

Tracking code for Google Analytics. <http://www.google.com/analytics/>

## Environment Setup

Place the following key/value pairs in an `.env` file locally and within the settings panel of your Heroku application.

### Setting Up MongoDB

Read more at <https://devcenter.heroku.com/articles/nodejs-mongoose#mongodb-connectors>.

```
MONGOLAB_URI=mongodb://username:password@mongolab.com/linear
```

### Setting Up Social Networks

Omitting either of these social networks will prevent it from showing up on the login screen.

#### Facebook

For more information on how to retrieve these keys see <https://github.com/trylinear/linear/wiki/Social-Setup#facebook>.

```
FACEBOOK_CLIENT_ID=<token>
FACEBOOK_CLIENT_SECRET=<token>
FACEBOOK_CALLBACK=http://localhost:5000/login/facebook/callback
```

#### Google

For more information on how to retrieve these keys see <https://github.com/trylinear/linear/wiki/Social-Setup#google>.

```
GOOGLE_CLIENT_ID=<token>
GOOGLE_CLIENT_SECRET=<token>
GOOGLE_CALLBACK=http://localhost:5000/login/google/callback
```

#### Twitter

For more information on how to retrieve these keys see <https://github.com/trylinear/linear/wiki/Social-Setup#twitter>.

```
TWITTER_CONSUMER_KEY=<token>
TWITTER_CONSUMER_SECRET=<token>
TWITTER_CALLBACK=http://localhost:5000/login/twitter/callback
```

The default template supports [Twitter Cards](https://dev.twitter.com/cards/overview). To get these to display you must first run a sample post through the [Card Validator](https://cards-dev.twitter.com/validator) and then **Request Approval** to be whitelisted.

### Setting Up Express Session Security

Read more at <https://github.com/expressjs/session#sessionoptions>.

```
SECRET=<token>
```
