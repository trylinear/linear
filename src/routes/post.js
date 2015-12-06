var requireLogin = require('../utils/auth').requireLogin;

var post = require('../controllers/post');
var message = require('../controllers/message');

module.exports = function (router) {

    router.get('/new', requireLogin, function (req, res) {

        res.render('post_create', {
            page_title: req.__('Create New Post')
        });

    });

    router.post('/new', requireLogin, function (req, res, next) {

        post.create(req.body, req.user.id).then(function (post) {

            res.redirect('/post/' + post.slug + '/' + post.id + '/');

        }).catch(next);

    });

    router.get('/:slug?/:id', function (req, res, next) {

        post.show(req.params.id).then(function (post) {

            res.render('post', {
                page_title: post.title,
                description: post.contents,
                post: post
            });

        }).catch(next);

    });

    router.post('/:slug?/:id/message/', requireLogin, function (req, res, next) {

        message.create(req.params.id, req.body, req.user.id).then(function (message) {

            if (req.params.slug) {

                res.redirect('/post/' + req.params.slug + '/' + req.params.id + '/#message-' + message.id);

            } else {

                res.redirect('/post/' + req.params.id + '/#message-' + message.id);

            }

        }).catch(next);

    });

};
