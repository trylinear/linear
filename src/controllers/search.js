var postModel = require('../models/post');

module.exports = {

    show: function (query) {

        return postModel.searchPosts(query);

    }

};
