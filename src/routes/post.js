const {requireLogin} = require('../utils/auth');

const postController = require('../controllers/post');
const messageController = require('../controllers/message');

module.exports = router => {

    router.get('/new', requireLogin, (req, res) => {

        res.render('post_create', {
            'page_title': req.__('Create New Post')
        });

    });

    router.post('/new', requireLogin, (req, res, next) => {

        postController.create(req.body, req.user.id).then(post => {

            res.redirect(`/post/${post.slug}/${post.id}/`);

        })
            .catch(next);

    });

    router.get('/:slug?/:id', (req, res, next) => {

        postController.show(req.params.id).then(post => {

            res.render('post', {
                'description': post.contents,
                'page_title': post.title,
                post
            });

        })
            .catch(next);

    });

    router.post('/:slug?/:id/message/', requireLogin, (req, res, next) => {

        messageController.create(req.params.id, req.body, req.user.id).then(message => {

            if (req.params.slug) {

                res.redirect(`/post/${req.params.slug}/${req.params.id}/#message-${message.id}`);

            } else {

                res.redirect(`/post/${req.params.id}/#message-${message.id}`);

            }

        })
            .catch(next);

    });

};
