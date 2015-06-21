var requireLogin = require('../../../utils/auth').requireLogin;

var profile = require('../../../controllers/profile');

module.exports = function (router) {

    router.get('/auth', requireLogin, function (req, res) {

        profile.show(req.user.id).then(function (profile) {

            res.json(profile);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

    router.get('/:profileId', function (req, res) {

        profile.show(req.params.profileId).then(function (profile) {

            res.json(profile);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

};
