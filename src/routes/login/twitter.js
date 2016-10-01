const profileController = require('../../controllers/profile');

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

if (process.env.TWITTER_CONSUMER_KEY &&
    process.env.TWITTER_CONSUMER_SECRET &&
    process.env.TWITTER_CALLBACK) {

    passport.use(new TwitterStrategy({
        'callbackURL': process.env.TWITTER_CALLBACK,
        'consumerKey': process.env.TWITTER_CONSUMER_KEY,
        'consumerSecret': process.env.TWITTER_CONSUMER_SECRET
    }, (accessToken, refreshToken, data, done) => {

        profileController.create('twitter', {
            'avatar': data.photos[0].value.replace(/_normal\.(.+)?/, '_bigger.$1'),
            'id': data.id,
            'name': data.displayName
        })
        .then(profile => {

            done(null, profile);

        });

    }));

    module.exports = router => {

        router.get('/', passport.authenticate('twitter'));
        router.get('/callback', passport.authenticate('twitter', {
            'failureRedirect': '/login/',
            'successRedirect': '/login/success/'
        }));

    };

}
