var postModel = require('../models/post');

module.exports = {

    create: function (data, profileId) {

        return postModel.createPost(data, profileId);

    },

    update: function (postId, data, profileId) {

        return postModel.updatePostById(postId, data, profileId);

    },

    list: function () {

        return postModel.listPosts();

    },

    show: function (postId) {

        return postModel.showPostById(postId);

    }

};
