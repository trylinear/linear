# linear

> A simple setup micro-forum built with Node.js, MongoDB and Express.

## Install

```bash
$ npm install linear --save
```

## Quick Start

```javascript
var linear = require('linear');

linear.startWithConfig({
    "site_name": "Sample Forum"
});
```

## Config

### site_name

Type: `String`  
Default: `'Sample Forum'`

Name used in both `header` and `title` tags throughout the site.

### directories

Type: `Object`  
Default: `{ "static": "./static" }`

Directories used to overwrite the assets included with linear.

- `static`: All static files: CSS, Fonts, JavaScript
- `locales`: Localization files.
- `views`: Server-side templates.

Note: Replacing either the `locales` or `views` directory is a destructive action. Replacing `static` is a additive action as the server will look for static files in the config specified directory first.

## Environment Setup

Place the following key/value pairs in an `.env` file locally and within the settings panel of your Heroku application.

### Setting Up MongoDB

Read more at <https://devcenter.heroku.com/articles/nodejs-mongoose#mongodb-connectors>.

```
MONGOLAB_URI=mongodb://username:password@mongolab.com/linear
```

### Setting Up Social Networks

Omitting either of these social networks will prevent it from showing up on the login screen.

```
FACEBOOK_CLIENT_ID=<token>
FACEBOOK_CLIENT_SECRET=<token>
FACEBOOK_CALLBACK=http://localhost:5000/login/facebook/callback

TWITTER_CONSUMER_KEY=<token>
TWITTER_CONSUMER_SECRET=<token>
TWITTER_CALLBACK=http://localhost:5000/login/twitter/callback
```

### Setting Up Express Session Security

Read more at <https://github.com/expressjs/session#sessionoptions>.

```
SECRET=<token>
```
