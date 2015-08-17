var postModel = require('../models/post');

module.exports = {

    create: function (postId, data, profileId) {

        return postModel.addMessageToPostById(postId, data, profileId);

    },

    update: function (postId, messageId, data, profileId) {

        return postModel.updateMessageToPostById(postId, messageId, data, profileId);

    },

    delete: function (postId, messageId, data, profileId) {

        return postModel.deleteMessageFromPostById(postId, messageId, profileId);

    },

    list: function (postId) {

        return postModel.listMessagesByPostId(postId);

    },

    show: function (postId, messageId) {

        return postModel.showMessageById(postId, messageId);

    }

};
