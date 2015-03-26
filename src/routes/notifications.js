var requireLogin = require('../utils/auth').requireLogin;

var notification = require('../controllers/notification');

module.exports = function (router) {

    router.get('/', requireLogin, function (req, res, next) {

        notification.list(req.user.id).then(function (notifications) {

            res.render('notifications', {
                title: req.__('Notifications'),
                notifications: notifications
            });

        }).catch(next);

    });

};
