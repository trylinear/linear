var postModel = require('../models/post');

module.exports = {

    create: function (data, profileId) {

        return postModel.createPost({
            title: data ? data.title : '',
            contents: data ? data.contents : '',
            createdBy: profileId
        });

    },

    list: function () {

        return postModel.listPosts();

    },

    show: function (postId) {

        return postModel.showPostById(postId);

    }

};
