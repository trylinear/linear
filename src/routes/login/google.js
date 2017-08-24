const profileController = require('../../controllers/profile');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const AVATAR_DIMENSION = 200;

if (process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CALLBACK) {

    passport.use(new GoogleStrategy({
        'callbackURL': process.env.GOOGLE_CALLBACK,
        'clientID': process.env.GOOGLE_CLIENT_ID,
        'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
        'scope': 'profile'
    }, (accessToken, refreshToken, data, done) => {

        profileController.create('google', {
            'avatar': data.photos[0].value.replace(/50$/, AVATAR_DIMENSION),
            'id': data.id,
            'name': data.displayName
        })
            .then(profile => {

                done(null, profile);

            });

    }));

    module.exports = router => {

        router.get('/', passport.authenticate('google'));
        router.get('/callback', passport.authenticate('google', {
            'failureRedirect': '/login/',
            'successRedirect': '/login/success/'
        }));

    };

}
