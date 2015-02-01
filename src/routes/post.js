var requireLogin = require('../utils/auth').requireLogin;
var post = require('../controllers/post');

module.exports = function (router) {

    router.get('/new', requireLogin, post.create);
    router.post('/new', requireLogin, post.create);

    router.get('/:slug?/:id', post.render);
    router.post('/:slug?/:id', requireLogin, post.render);

};
