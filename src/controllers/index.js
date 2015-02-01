var postModel = require('../models/post');

module.exports = {

    render: function (req, res, next) {

        postModel.find()
            .populate('createdBy')
            .sort({ updated: -1 })
            .exec(function (err, posts) {

                if (err) { return next(err); }

                res.render('posts', {
                    title: req.__('Recent Posts'),
                    posts: posts
                });

            });

    }

};
