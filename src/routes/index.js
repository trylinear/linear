const post = require('../controllers/post');

module.exports = router => {

    router.get('/', (req, res, next) => {

        post.list().then(posts => {

            res.render('post_list', {
                'page_title': req.__('Recent Posts'),
                posts
            });

        })
            .catch(next);

    });

};
