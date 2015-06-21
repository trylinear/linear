var requireLogin = require('../../../utils/auth').requireLogin;

var post = require('../../../controllers/post');
var message = require('../../../controllers/message');

module.exports = function (router) {

    router.get('/', function (req, res) {

        post.list().then(function (posts) {

            res.json(posts);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

    router.get('/:postId', function (req, res) {

        post.show(req.params.postId).then(function (post) {

            res.json(post);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

    router.put('/:postId', requireLogin, function (req, res) {

        post.update(req.params.postId, req.body, req.user.id).then(function (post) {

            res.json(post);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

    router.get('/:postId/messages', function (req, res) {

        message.list(req.params.postId).then(function (messages) {

            res.json(messages);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

    router.post('/:postId/messages', requireLogin, function (req, res) {

        message.create(req.params.postId, req.body, req.user.id).then(function (message) {

            res.json(message);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

    router.get('/:postId/messages/:messageId', function (req, res) {

        message.show(req.params.postId, req.params.messageId).then(function (message) {

            res.json(message);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

};
