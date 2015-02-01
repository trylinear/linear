module.exports = {

    render: function (req, res) {

        req.session.destroy();

        req.logout();

        res.redirect(req.headers.referer || '/');

    }

};
