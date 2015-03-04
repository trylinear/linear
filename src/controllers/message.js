var q = require('q');

var postModel = require('../models/post');

module.exports = {

    create: function (postId, data, profileId) {

        var deferred = new q.defer();

        if (postId && data.contents && profileId) {

            postModel.addMessageToPostById(postId, {
                contents: data.contents,
                createdBy: profileId
            }, function (err, post) {

                if (err || !post) { deferred.reject(err); }
                else { deferred.resolve(post); }

            });

        }

        return deferred.promise;

    }

};
