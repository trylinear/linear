const postModel = require('../models/post');

module.exports = {

    create (data, profileId) {

        return postModel.createPost(data, profileId);

    },

    delete (postId, profileId) {

        return postModel.deletePostById(postId, profileId);

    },

    list () {

        return postModel.listPosts();

    },

    show (postId) {

        return postModel.showPostById(postId);

    },

    update (postId, data, profileId) {

        return postModel.updatePostById(postId, data, profileId);

    }

};
