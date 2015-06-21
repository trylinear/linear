var postModel = require('../models/post');

module.exports = {

    create: function (data, profileId) {

        return postModel.createPost({
            title: data ? data.title : '',
            contents: data ? data.contents : '',
            createdBy: profileId
        });

    },

    update: function (postId, data, profileId) {

        return postModel.updatePostById(postId, {
            title: data ? data.title : null,
            contents: data ? data.contents : null,
            editedBy: profileId
        });

    },

    list: function () {

        return postModel.listPosts();

    },

    show: function (postId) {

        return postModel.showPostById(postId);

    }

};
