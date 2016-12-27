const requireLogin = require('../../../utils/auth').requireLogin;

const profileController = require('../../../controllers/profile');

module.exports = router => {

    router.get('/auth', requireLogin, (req, res) => {

        profileController.show(req.user.id).then(profile => {

            res.json(profile);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

    router.get('/:profileId', (req, res) => {

        profileController.show(req.params.profileId).then(profile => {

            res.json(profile);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

};
