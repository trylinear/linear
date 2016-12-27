const requireLogin = require('../utils/auth').requireLogin;

const settingsController = require('../controllers/settings');

module.exports = router => {

    router.get('/', requireLogin, (req, res) => {

        res.render('settings', {
            'page_title': req.__('Settings'),
            'style': 'settings'
        });

    });

    router.post('/', requireLogin, (req, res, next) => {

        settingsController.update(req.user.id, req.body).then(() => {

            res.redirect('/settings/');

        })
        .catch(next);

    });

};
