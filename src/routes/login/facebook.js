var profile = require('../../controllers/profile');

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET && process.env.FACEBOOK_CALLBACK) {

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK
    }, function (accessToken, refreshToken, data, done) {

        profile.create('facebook', {
            id: data.id,
            name: data.displayName,
            avatar: 'https://graph.facebook.com/' + data.id + '/picture?type=large'
        }).then(function (profile) {

            done(null, profile);

        });

    }));

    module.exports = function (router) {

        router.get('/', passport.authenticate('facebook'));
        router.get('/callback', passport.authenticate('facebook', {
            successRedirect: '/login/success/',
            failureRedirect: '/login/'
        }));

    };

}
