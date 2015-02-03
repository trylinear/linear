module.exports = function (router) {

    router.get('/', function (req, res) {

        var referer = req.session.referer || '/';

        req.session.referer = null;

        res.redirect(referer);

    });

};
