const postModel = require('../models/post');

module.exports = {

    show (query) {

        return postModel.searchPosts(query);

    }

};
