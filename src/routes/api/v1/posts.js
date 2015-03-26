var post = require('../../../controllers/post');

module.exports = function (router) {

    router.get('/', function (req, res) {

        post.list().then(function (posts) {

            res.json(posts);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

    router.get('/:id', function (req, res) {

        post.show(req.params.id).then(function (post) {

            res.json(post);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

};
