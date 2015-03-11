require('with-env')();

var _ = require('lodash');

var express = require('express');

var session = require('express-session');
var bodyParser = require('body-parser');
var enrouten = require('express-enrouten');

var passport = require('passport');

var hbs = require('express-hbs');
var hbs_helpers = require('./src/utils/helpers')(hbs);

var i18n = require('i18n');
var moment = require('moment');

var mongoose = require('mongoose');

var defaultConfig = require('./config.json');

var profileModel = require('./src/models/profile');

var latest = require('./src/utils/latest');
var env = require('./src/utils/env');

module.exports = {

    startWithConfig: function (config) {

        var app = express();

        app.disable('x-powered-by');

        config = _.assign(defaultConfig, config);

        mongoose.connect(env.mongodb());

        app.use(session({
            secret: process.env.SECRET || 'secret',
            resave: true,
            saveUninitialized: true
        }));

        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(function (user, done) {

            done(null, user.id);

        });

        passport.deserializeUser(function (id, done) {

            profileModel.findById(id, done);

        });

        i18n.configure({
            indent: '  ',
            directory: config.directories.locales || __dirname + '/locales',
            locales: Object.keys(config.languages),
            defaultLocale: Object.keys(config.languages)[0]
        });

        app.use(i18n.init);

        if (config.directories.static) {

            app.use(express.static(config.directories.static));

        }

        app.use(express.static(__dirname + '/static'));

        app.use(function (req, res, next) {

            res.locals.layout = 'template';
            res.locals.latest_version = latest();
            res.locals.config = config;
            res.locals.user = req.user;
            res.locals.url = req.protocol + '://' + req.get('host') + req.originalUrl;

            hbs.registerHelper('__', function () {

                return i18n.__.apply(req, arguments);

            });

            if (req.user) {

                res.setLocale(req.user.locale);

            }

            res.locals.lang = req.getLocale();

            moment.locale(req.getLocale());

            next();

        });

        app.use(enrouten({ directory: 'src/routes' }));

        app.use(function (err, req, res, next) {

            res.status(err.status || 500);
            res.render('error', { status: err.status || 500, message: err.message });

        });

        app.use(function (req, res, next) {

            res.status(404);
            res.render('error', { status: 404, message: req.__('Page Not Found') });

        });

        app.engine('hbs', hbs.express3());

        app.set('view engine', 'hbs');

        if (config.directories.views) {

            app.set('views', [config.directories.views, __dirname + '/src/views']);

        } else {

            app.set('views', __dirname + '/src/views');

        }

        app.listen(env.port(), env.ipaddress());

    }

};
