var postModel = require('../models/post');

module.exports = {

    create: function (req, res, next) {

        if (req.user && req.body.title && req.body.contents) {

            postModel.createPost({
                title: req.body.title,
                contents: req.body.contents,
                createdBy: req.user._id
            }, function (err, post) {

                if (err) { return next(err); }

                res.redirect('/post/' + post.slug + '/' + post._id + '/');

            });

        } else {

            res.render('post_create', {
                title: req.__('Create New Post')
            });

        }

    },

    render: function (req, res, next) {

        if (req.user && req.body.contents) {

            postModel.findById(req.params.id).
                exec(function (err, post) {

                    if (err) { return next(err); }

                    post.addMessage({
                        contents: req.body.contents,
                        createdBy: req.user._id
                    }, function (err, post) {

                        if (err) { return next(err); }

                        res.redirect('#message-' + post.messages[post.messages.length - 1]._id);

                    });

                });

        } else {

            postModel.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
                .populate('createdBy')
                .populate('messages.createdBy')
                .exec(function (err, post) {

                    if (err) { return next(err); }

                    res.render('post', {
                        title: post.title,
                        post: post
                    });

                });

        }

    }

};
