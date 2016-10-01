const express = require('express');

const session = require('express-session');
const bodyParser = require('body-parser');

const lusca = require('lusca');
const enrouten = require('express-enrouten');
const meddleware = require('meddleware');

const passport = require('passport');

const hbs = require('express-hbs');

require('./src/utils/helpers')(hbs);

const i18n = require('i18n');
const moment = require('moment');

const mongoose = require('mongoose');

const defaultConfig = require('./config.json');

const profileModel = require('./src/models/profile');

const latest = require('./src/utils/latest');
const env = require('./src/utils/env');

const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_NOT_FOUND = 404;

module.exports = {

    'startWithConfig': config => {

        const app = express();

        app.disable('x-powered-by');

        config = Object.assign({}, defaultConfig, config);

        mongoose.connect(env.mongodb());

        app.use(session({
            'resave': true,
            'saveUninitialized': true,
            'secret': process.env.SECRET || 'secret'
        }));

        app.use(bodyParser.urlencoded({
            'extended': true
        }));

        app.use(bodyParser.json());

        app.use(meddleware({
            'security': {
                'enabled': true,
                'module': {
                    'arguments': [
                        {
                            'csrf': true,
                            'hsts': {
                                'maxAge': 31536000
                            },
                            'xframe': 'SAMEORIGIN',
                            'xssProtection': true
                        }
                    ],
                    'name': 'lusca'
                },
                'route': '/((?!api))*'
            }
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser((user, done) => {

            done(null, user.id);

        });

        passport.deserializeUser((id, done) => {

            profileModel.findById(id, done);

        });

        i18n.configure({
            'defaultLocale': Object.keys(config.languages)[0],
            'directory': `${config.directories.locales || __dirname}/locales`,
            'indent': '  ',
            'locales': Object.keys(config.languages)
        });

        app.use(i18n.init);

        if (config.directories.static) {

            app.use(express.static(config.directories.static));

        }

        app.use(express.static(`${__dirname}/static`));

        app.use((req, res, next) => {

            res.locals.layout = 'template';
            res.locals.latestVersion = latest();
            res.locals.config = config;
            res.locals.user = req.user;
            res.locals.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

            hbs.registerHelper('__', (...args) => i18n.__.apply(req, args));

            if (req.user) {

                res.setLocale(req.user.locale);

            }

            res.locals.lang = req.getLocale();

            moment.locale(req.getLocale());

            next();

        });

        app.use(enrouten({
            'directory': 'src/routes'
        }));

        app.use((err, req, res, next) => {

            res.status(err.status || HTTP_INTERNAL_SERVER_ERROR);
            res.render('error', {
                'message': err.message,
                'status': err.status || HTTP_INTERNAL_SERVER_ERROR
            });

        });

        app.use((req, res, next) => {

            res.status(HTTP_NOT_FOUND);
            res.render('error', {
                'message': req.__('Page Not Found'),
                'status': HTTP_NOT_FOUND
            });

        });

        if (config.directories.views) {

            app.engine('hbs', hbs.express4({
                'onCompile': (exhbs, source) => exhbs.handlebars.compile(source, {'preventIndent': true}),
                'partialsDir': [`${config.directories.views}/partials`, `${__dirname}/src/views/partials`]
            }));

            app.set('views', [config.directories.views, `${__dirname}/src/views`]);

        } else {

            app.engine('hbs', hbs.express4({
                'onCompile': (exhbs, source) => exhbs.handlebars.compile(source, {'preventIndent': true}),
                'partialsDir': `${__dirname}/src/views/partials`
            }));

            app.set('views', `${__dirname}/src/views`);

        }

        app.set('view engine', 'hbs');

        app.listen(env.port(), env.ipaddress());

    }

};
