const requireLogin = require('../../../utils/auth').requireLogin;

const postController = require('../../../controllers/post');
const messageController = require('../../../controllers/message');

module.exports = router => {

    router.get('/', (req, res) => {

        postController.list().then(posts => {

            res.json(posts);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

    router.get('/:postId', (req, res) => {

        postController.show(req.params.postId).then(post => {

            res.json(post);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

    router.put('/:postId', requireLogin, (req, res) => {

        postController.update(
            req.params.postId,
            req.body,
            req.user.id
        ).then(post => {

            res.json(post);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

    router.delete('/:postId', (req, res) => {

        postController.delete(req.params.postId).then(post => {

            res.json(post);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

    router.get('/:postId/messages', (req, res) => {

        messageController.list(req.params.postId).then(messages => {

            res.json(messages);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

    router.post('/:postId/messages', requireLogin, (req, res) => {

        messageController.create(
            req.params.postId,
            req.body,
            req.user.id
        ).then(message => {

            res.json(message);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

    router.get('/:postId/messages/:messageId', (req, res) => {

        messageController.show(
            req.params.postId,
            req.params.messageId
        ).then(message => {

            res.json(message);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

    router.put('/:postId/messages/:messageId', (req, res) => {

        messageController.update(
            req.params.postId,
            req.params.messageId,
            req.body,
            req.user.id
        ).then(message => {

            res.json(message);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

    router.delete('/:postId/messages/:messageId', (req, res) => {

        messageController.delete(
            req.params.postId,
            req.params.messageId,
            req.user.id
        ).then(message => {

            res.json(message);

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
