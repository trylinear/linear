var profile = require('../controllers/profile');

module.exports = function (router) {

    router.get('/:id', profile.render);

};
