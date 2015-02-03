module.exports = function (router) {

    router.get('/', function (req, res) {

        req.session.destroy();

        req.logout();

        res.redirect(req.headers.referer || '/');

    });

};
