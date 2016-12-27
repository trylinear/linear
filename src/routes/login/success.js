module.exports = router => {

    router.get('/', (req, res) => {

        const referer = req.session.referer || '/';

        req.session.referer = null;

        res.redirect(referer);

    });

};
