var q = require('q');

var postModel = require('../models/post');

module.exports = {

    create: function (postId, data, user) {

        var deferred = new q.defer();

        if (postId && data.contents && user) {

            postModel.addMessageToPostById(postId, {
                contents: data.contents,
                createdBy: user._id
            }, function (err, post) {

                if (err || !post) { deferred.reject(err); }
                else { deferred.resolve(post); }

            });

        }

        return deferred.promise;

    }

};
