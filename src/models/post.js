var q = require('q');

var _ = require('underscore');

var mongoose = require('mongoose');

var logger = require('../utils/logger');

var messageSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    contents: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' },
    editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' }
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
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' },
    editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' }
});

postSchema.statics.createPost = function (data, profileId) {

    var self = this,
        deferred = new q.defer();

    var post = new this({
        title: data.title,
        slug: data.title.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^\-|\-$/g, ''),
        contents: data.contents,
        createdBy: profileId
    });

    post.save(function (err, post) {

        if (err || !post) {

            logger.err('Error creating new post.', err, data);

            deferred.reject({
                status: 500,
                message: 'Internal Server Error'
            });

        } else { deferred.resolve(self.showPostById(post._id)); }

    });

    return deferred.promise;

};

postSchema.statics.updatePostById = function (postId, data, profileId) {

    var deferred = new q.defer();

    this.findById(postId)
        .exec(function (err, post) {

            if (err || !post) {

                logger.err('Error updating exiting post.', err, data);

                deferred.reject({
                    status: 500,
                    message: 'Internal Server Error'
                });

            } else if (![profileId].filter(post.createdBy.equals, post.createdBy).length) {

                logger.err('Authentication invalid.', err, data);

                deferred.reject({
                    status: 401,
                    message: 'Unauthorized'
                });

            } else {

                if (data.title) {
                    post.title = data.title;
                }

                if (data.contents) {
                    post.contents = data.contents;
                }

                post.editedBy = profileId;

                post.save(function (err, post) {

                    if (err || !post) {

                        logger.err('Error updating exiting post.', err, data);

                        deferred.reject({
                            status: 500,
                            message: 'Internal Server Error'
                        });

                    } else { deferred.resolve(post); }

                });

            }

        });

    return deferred.promise;

};

postSchema.statics.addMessageToPostById = function (postId, data, profileId) {

    var self = this,
        deferred = new q.defer();

    this.findOneAndUpdate(
        { '_id': postId },
        {
            '$set': {
                'updatedAt': Date.now(),
            },
            '$push': {
                'messages': {
                    contents: data.contents,
                    createdBy: profileId
                }
            },
            '$inc': {
                'messageCount': 1
            }
        },
        { 'new': true },
        function (err, post) {

            if (err || !post) {

                logger.err('Error updating exiting message.', err, data);

                deferred.reject({
                    status: 500,
                    message: 'Internal Server Error'
                });

            } else {

                deferred.resolve(self.showMessageById(postId, post.messages[post.messages.length - 1]._id));

            }

        }
    );

    return deferred.promise;

};

postSchema.statics.updateMessageToPostById = function (postId, messageId, data, profileId) {

    var self = this,
        deferred = new q.defer();

    this.findOneAndUpdate(
        { '_id': postId, 'messages._id': messageId },
        {
            '$set': {
                'updatedAt': Date.now(),
                'messages.$.updatedAt': Date.now(),
                'messages.$.contents': data.contents,
                'messages.$.editedBy': profileId
            }
        },
        { 'new': true },
        function (err, post) {

            if (err || !post) {

                logger.err('Error updating exiting message.', err, data);

                deferred.reject({
                    status: 500,
                    message: 'Internal Server Error'
                });

            } else {

                self.showMessageById(postId, messageId).then(deferred.resolve);

            }

        }
    );

    return deferred.promise;

};

postSchema.statics.deleteMessageFromPostById = function (postId, messageId, profileId) {

    var self = this,
        deferred = new q.defer();

    this.findOneAndUpdate(
        { '_id': postId },
        {
            '$set': {
                'updatedAt': Date.now()
            },
            '$pull': {
                'messages': { '_id': messageId }
            },
            '$inc': {
                'messageCount': -1
            }
        },
        { 'new': true },
        function (err, post) {

            if (err || !post) {

                logger.err('Error deleting exiting message.', err);

                deferred.reject({
                    status: 500,
                    message: 'Internal Server Error'
                });

            } else {

                deferred.resolve([]);

            }

        }
    );

    return deferred.promise;

};

postSchema.statics.showPostById = function (postId) {

    var deferred = new q.defer();

    this.findByIdAndUpdate(postId, { $inc: { views: 1 } })
        .populate('createdBy')
        .populate('editedBy')
        .populate('messages.createdBy')
        .populate('messages.editedBy')
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

postSchema.statics.showMessageById = function (postId, messageId) {

    var deferred = new q.defer();

    this.find({ 'messages._id': messageId }, { 'messages.$': true })
        .populate('messages.createdBy')
        .populate('messages.editedBy')
        .exec(function (err, post) {

            if (err || !post || !post[0].messages) {

                logger.err('Message id ' + messageId + ' not found.');

                deferred.reject({
                    status: 404,
                    message: 'Message not found.'
                });

            } else { deferred.resolve(post[0].messages[0]); }

        });

    return deferred.promise;

};

postSchema.statics.listPosts = function () {

    var deferred = new q.defer();

    this.find()
        .populate('createdBy')
        .populate('editedBy')
        .sort({ pinned: -1, updatedAt: -1 })
        .select('createdAt updatedAt views title slug contents messageCount createdBy editedBy')
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

postSchema.statics.listMessagesByPostId = function (postId) {

    var deferred = new q.defer();

    this.findByIdAndUpdate(postId, { $inc: { views: 1 } })
        .populate('createdBy')
        .populate('editedBy')
        .populate('messages.createdBy')
        .populate('messages.editedBy')
        .exec(function (err, post) {

            if (err || !post) {

                logger.err('Post id ' + postId + ' not found.');

                deferred.reject({
                    status: 404,
                    message: 'Post not found.'
                });

            } else { deferred.resolve(post.messages); }

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
                .populate('editedBy')
                .sort({ updatedAt: -1 })
                .select('createdAt updatedAt views title slug contents messageCount createdBy editedBy')
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

messageSchema.virtual('id').get(function () {

    return this._id.toHexString();

});

messageSchema.set('toJSON', {

    virtuals: true

});

postSchema.virtual('id').get(function () {

    return this._id.toHexString();

});

postSchema.set('toJSON', {

    virtuals: true

});

module.exports = mongoose.model('post', postSchema);
