var postModel = require('../models/post');

module.exports = {

    create: function (postId, data, profileId) {

        return postModel.addMessageToPostById(postId, {
            contents: data ? data.contents : '',
            createdBy: profileId
        });

    },

    list: function (postId) {

        return postModel.listMessagesByPostId(postId);

    },

    show: function (postId, messageId) {

        return postModel.showMessageById(postId, messageId);

    }

};
