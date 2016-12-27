const profileController = require('../controllers/profile');

module.exports = router => {

    router.get('/:id', (req, res, next) => {

        profileController.show(req.params.id).then(profile => {

            res.render('profile', {
                'page_title': req.__('Profile'),
                profile,
                'style': 'profile'
            });

        })
        .catch(next);

    });

};
