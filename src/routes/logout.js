module.exports = router => {

    router.get('/', (req, res) => {

        req.session.destroy();

        req.logout();

        res.redirect(req.headers.referer || '/');

    });

};
