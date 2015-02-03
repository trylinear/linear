var post = require('../../../controllers/post');

module.exports = function (router) {

    router.get('/', function (req, res) {

        post.list().then(function (posts) {

            res.json(posts);

        }).catch(function (err) {

            res.status(404);
            res.json({ message: 'Not Found', code: 404 });

        });

    });

    router.get('/:id', function (req, res) {

        post.show(req.params.id).then(function (post) {

            res.json(post);

        }).catch(function (err) {

            res.status(404);
            res.json({ message: 'Not Found', code: 404 });

        });

    });

};
