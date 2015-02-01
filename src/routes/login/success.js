var login = require('../../controllers/login');

module.exports = function (router) {

    router.get('/', login.success);

};
