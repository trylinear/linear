var profile = require('../../../controllers/profile');

module.exports = function (router) {

    router.get('/:id', function (req, res) {

        profile.show(req.params.id).then(function (profile) {

            res.json(profile);

        }).catch(function (err) {

            res.status(404);
            res.json({ message: 'Not Found', code: 404 });

        });

    });

};
