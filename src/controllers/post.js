var q = require('q');

var postModel = require('../models/post');

module.exports = {

    create: function (data, user) {

        var deferred = new q.defer();

        if (data.title && data.contents && user) {

            postModel.createPost({
                title: data.title,
                contents: data.contents,
                createdBy: user._id
            }, function (err, post) {

                if (err || !post) { deferred.reject(err); }
                else { deferred.resolve(post); }

            });

        }

        return deferred.promise;

    },

    list: function () {

        var deferred = new q.defer();

        postModel.listPosts(function (err, posts) {

            if (err || !posts) { deferred.reject(err); }
            else { deferred.resolve(posts); }

        });

        return deferred.promise;

    },

    show: function (postId) {

        var deferred = new q.defer();

        postModel.showPostById(postId, function (err, post) {

            if (err || !post) { deferred.reject(err); }
            else { deferred.resolve(post); }

        });

        return deferred.promise;

    }

};
