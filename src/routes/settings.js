var requireLogin = require('../utils/auth').requireLogin;

var settings = require('../controllers/settings');

module.exports = function (router) {

    router.get('/', requireLogin, function (req, res) {

        res.render('settings', {
            title: req.__('Settings')
        });

    });

    router.post('/', requireLogin, function (req, res, next) {

        settings.update(req.body, req.user.id).then(function (profile) {

            res.redirect('/settings/');

        }).catch(next);

    });

};
