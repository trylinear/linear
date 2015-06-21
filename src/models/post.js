var q = require('q');

var mongoose = require('mongoose');

var logger = require('../utils/logger');

var messageSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    contents: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' }
});

var postSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    title: { type: String, required: true },
    slug: String,
    contents: String,
    messageCount: { type: Number, default: 0 },
    messages: [messageSchema],
    pinned: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' }
});

postSchema.statics.createPost = function (data) {

    var deferred = new q.defer();

    var post = new this({
        title: data.title,
        slug: data.title.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^\-|\-$/g, ''),
        contents: data.contents,
        createdBy: data.createdBy
    });

    post.save(function (err, post) {

        if (err || !post) {

            logger.err('Error creating new post.', err, data);

            deferred.reject({
                status: 500,
                message: 'Internal Server Error'
            });

        } else { deferred.resolve(post); }

    });

    return deferred.promise;

};

postSchema.statics.addMessageToPostById = function (postId, data) {

    var deferred = new q.defer();

    this.findById(postId)
        .exec(function (err, post) {

            post.messages.push({
                contents: data.contents,
                createdBy: data.createdBy
            });

            post.save(function (err, post) {

                if (err || !post) {

                    logger.err('Error creating new message.', err, data);

                    deferred.reject({
                        status: 500,
                        message: 'Internal Server Error'
                    });

                } else { deferred.resolve(post); }

            });

        });

    return deferred.promise;

};

postSchema.statics.showPostById = function (postId) {

    var deferred = new q.defer();

    this.findByIdAndUpdate(postId, { $inc: { views: 1 } })
        .populate('createdBy')
        .populate('messages.createdBy')
        .exec(function (err, post) {

            if (err || !post) {

                logger.err('Post id ' + postId + ' not found.');

                deferred.reject({
                    status: 404,
                    message: 'Post not found.'
                });

            } else { deferred.resolve(post); }

        });

    return deferred.promise;

};

postSchema.statics.listPosts = function () {

    var deferred = new q.defer();

    this.find()
        .populate('createdBy')
        .sort({ pinned: -1, updatedAt: -1 })
        .select('createdAt updatedAt views title slug contents messageCount createdBy')
        .exec(function (err, posts) {

            if (err || !posts) {

                logger.err('Error retrieving post list.', err);

                deferred.reject({
                    status: 500,
                    message: 'Internal Server Error'
                });

            } else { deferred.resolve(posts); }

        });

    return deferred.promise;

};

postSchema.statics.searchPosts = function (query) {

    var deferred = new q.defer();

    if (query) {

        query = query.trim().toLowerCase();
        query = query.replace(/[^0-9a-z]+/, '|').replace(/^\||\|$/, '');

        if (query) {

            this.find({ title: { $regex: new RegExp(query, 'i') } })
                .populate('createdBy')
                .sort({ updatedAt: -1 })
                .select('createdAt updatedAt views title slug contents messageCount createdBy')
                .exec(function (err, posts) {

                    if (err || !posts) {

                        logger.err('Error retrieving search results.', err, query);

                        deferred.reject({
                            status: 500,
                            message: 'Internal Server Error'
                        });

                    } else { deferred.resolve(posts); }

                });

        } else {

            deferred.resolve([]);

        }

    } else {

        deferred.resolve([]);

    }

    return deferred.promise;

};

postSchema.pre('save', function (next) {

    this.updatedAt = Date.now();
    this.messageCount = this.messages.length;

    next();

});

module.exports = mongoose.model('post', postSchema);
