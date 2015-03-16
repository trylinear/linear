var postModel = require('../models/post');

module.exports = {

    create: function (postId, data, profileId) {

        return postModel.addMessageToPostById(postId, {
            contents: data ? data.contents : '',
            createdBy: profileId
        });

    }

};
