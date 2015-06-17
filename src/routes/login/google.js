var profileModel = require('../../models/profile');

var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK) {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
        scope: 'profile'
    }, function (accessToken, refreshToken, data, done) {

        profileModel.createProfile('google', {
            id: data.id,
            name: data.displayName,
            avatar: data.photos[0].value.replace(/50$/, 200)
        }).then(function (profile) {

            done(null, profile);

        });

    }));

    module.exports = function (router) {

        router.get('/', passport.authenticate('google'));
        router.get('/callback', passport.authenticate('google', {
            successRedirect: '/login/success/',
            failureRedirect: '/login/'
        }));

    };

}
