module.exports = function (router) {

    router.get('/', function (req, res) {

        var social = [];

        if (process.env.FACEBOOK_CLIENT_ID &&
                process.env.FACEBOOK_CLIENT_SECRET &&
                process.env.FACEBOOK_CALLBACK) {
            social.push('facebook');
        }

        if (process.env.GOOGLE_CLIENT_ID &&
                process.env.GOOGLE_CLIENT_SECRET &&
                process.env.GOOGLE_CALLBACK) {
            social.push('google');
        }

        if (process.env.TWITTER_CONSUMER_KEY &&
                process.env.TWITTER_CONSUMER_SECRET &&
                process.env.TWITTER_CALLBACK) {
            social.push('twitter');
        }

        req.session.referer = req.headers.referer;

        res.render('login', {
            title: req.__('Login'),
            social: social
        });

    });

};
