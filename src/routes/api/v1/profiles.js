var profile = require('../../../controllers/profile');

module.exports = function (router) {

    router.get('/:id', function (req, res) {

        profile.show(req.params.id).then(function (profile) {

            res.json(profile);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

};
