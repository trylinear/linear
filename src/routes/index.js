var post = require('../controllers/post');

module.exports = function (router) {

    router.get('/', function (req, res, next) {

        post.list().then(function (posts) {

            res.render('post_list', {
                title: req.__('Recent Posts'),
                posts: posts
            });

        }).catch(next);

    });

};
