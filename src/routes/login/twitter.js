var profile = require('../../controllers/profile');

var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET && process.env.TWITTER_CALLBACK) {

    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK
    }, function (accessToken, refreshToken, data, done) {

        profile.create('twitter', {
            id: data.id,
            name: data.displayName,
            avatar: data.photos[0].value.replace(/_normal\.(.+)?/, '_bigger.$1')
        }).then(function (profile) {

            done(null, profile);

        });

    }));

    module.exports = function (router) {

        router.get('/', passport.authenticate('twitter'));
        router.get('/callback', passport.authenticate('twitter', {
            successRedirect: '/login/success/',
            failureRedirect: '/login/'
        }));

    };

}
