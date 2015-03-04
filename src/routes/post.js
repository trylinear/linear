var requireLogin = require('../utils/auth').requireLogin;

var post = require('../controllers/post');
var message = require('../controllers/message');

module.exports = function (router) {

    router.get('/new', requireLogin, function (req, res) {

        res.render('post_create', {
            title: req.__('Create New Post')
        });

    });

    router.post('/new', requireLogin, function (req, res, next) {

        post.create(req.body, req.user.id).then(function (post) {

            res.redirect('/post/' + post.slug + '/' + post._id + '/');

        }).catch(next);

    });

    router.get('/:slug?/:id', function (req, res, next) {

        post.show(req.params.id).then(function (post) {

            res.render('post', {
                title: post.title,
                post: post
            });

        }).catch(next);

    });

    router.post('/:slug?/:id', requireLogin, function (req, res, next) {

        message.create(req.params.id, req.body, req.user.id).then(function (post) {

            res.redirect('#message-' + post.messages[post.messageCount - 1]._id);

        }).catch(next);

    });

};
