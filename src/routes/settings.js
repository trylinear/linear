var requireLogin = require('../utils/auth').requireLogin;
var settings = require('../controllers/settings');

module.exports = function (router) {

    router.get('/', requireLogin, settings.render);
    router.post('/', requireLogin, settings.render);

};
