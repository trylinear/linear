var profileModel = require('../models/profile');
var postModel = require('../models/post');

module.exports = {

    render: function (req, res, next) {

        profileModel.findById(req.params.id).
            exec(function (err, profile) {

                if (err) { return next(err); }

                postModel.find({ createdBy: req.params.id })
                    .sort({ createdBy: -1 })
                    .exec(function (err, posts) {

                        if (err) { return next(err); }

                        res.render('profile', {
                            title: req.__('Profile'),
                            profile: profile,
                            posts: posts
                        });

                    });

            });

    }

};
