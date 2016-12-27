const profileController = require('../../controllers/profile');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

if (process.env.FACEBOOK_CLIENT_ID &&
    process.env.FACEBOOK_CLIENT_SECRET &&
    process.env.FACEBOOK_CALLBACK) {

    passport.use(new FacebookStrategy({
        'callbackURL': process.env.FACEBOOK_CALLBACK,
        'clientID': process.env.FACEBOOK_CLIENT_ID,
        'clientSecret': process.env.FACEBOOK_CLIENT_SECRET
    }, (accessToken, refreshToken, data, done) => {

        profileController.create('facebook', {
            'avatar': `https://graph.facebook.com/${data.id}/picture?type=large`,
            'id': data.id,
            'name': data.displayName
        }).then(profile => {

            done(null, profile);

        });

    }));

    module.exports = router => {

        router.get('/', passport.authenticate('facebook'));
        router.get('/callback', passport.authenticate('facebook', {
            'failureRedirect': '/login/',
            'successRedirect': '/login/success/'
        }));

    };

}
