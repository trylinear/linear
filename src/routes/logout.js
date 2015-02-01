var logout = require('../controllers/logout');

module.exports = function (router) {

    router.get('/', logout.render);

};
