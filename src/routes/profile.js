var profile = require('../controllers/profile');

module.exports = function (router) {

    router.get('/:id', function (req, res, next) {

        profile.show(req.params.id).then(function (profile) {

            res.render('profile', {
                title: req.__('Profile'),
                style: 'profile',
                profile: profile
            });

        }).catch(next);

    });

};
