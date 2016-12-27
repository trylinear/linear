const postModel = require('../models/post');

module.exports = {

    create (postId, data, profileId) {

        return postModel.addMessageToPostById(postId, data, profileId);

    },

    delete (postId, messageId, profileId) {

        return postModel.deleteMessageFromPostById(postId, messageId, profileId);

    },

    list (postId) {

        return postModel.listMessagesByPostId(postId);

    },

    show (postId, messageId) {

        return postModel.showMessageById(postId, messageId);

    },

    update (postId, messageId, data, profileId) {

        return postModel.updateMessageToPostById(postId, messageId, data, profileId);

    }

};
