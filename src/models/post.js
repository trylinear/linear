/* eslint func-names: 0 */
/* eslint no-invalid-this: 0 */

const mongoose = require('mongoose');

const logger = require('../utils/logger');

const messageSchema = new mongoose.Schema({
    'contents': {
        'required': true,
        'type': String
    },
    'createdAt': {
        'default': Date.now,
        'type': Date
    },
    'createdBy': {
        'ref': 'profile',
        'type': mongoose.Schema.Types.ObjectId
    },
    'editedBy': {
        'ref': 'profile',
        'type': mongoose.Schema.Types.ObjectId
    },
    'updatedAt': {
        'default': Date.now,
        'type': Date
    }
});

const postSchema = new mongoose.Schema({
    'contents': String,
    'createdAt': {
        'default': Date.now,
        'type': Date
    },
    'createdBy': {
        'ref': 'profile',
        'type': mongoose.Schema.Types.ObjectId
    },
    'editedBy': {
        'ref': 'profile',
        'type': mongoose.Schema.Types.ObjectId
    },
    'messageCount': {
        'default': 0,
        'type': Number
    },
    'messages': [messageSchema],
    'pinned': {
        'default': false,
        'type': Boolean
    },
    'slug': String,
    'title': {
        'required': true,
        'type': String
    },
    'updatedAt': {
        'default': Date.now,
        'type': Date
    },
    'views': {
        'default': 0,
        'type': Number
    }
});

postSchema.statics.createPost = function (data, profileId) {

    return new Promise((resolve, reject) => {

        const post = new this({
            'contents': data.contents,
            'createdBy': profileId,
            'slug': data.title.toLowerCase()
                .replace(/[^a-z]+/g, '-')
                .replace(/^\-|\-$/g, ''),
            'title': data.title
        });

        post.save((err, results) => {

            if (err || !results) {

                logger.err('Error creating new post.', err, data);

                reject({
                    'message': 'Internal Server Error',
                    'status': 500
                });

            } else {

                resolve(this.showPostById(results._id));

            }

        });

    });

};

postSchema.statics.updatePostById = function (postId, data, profileId) {

    return new Promise((resolve, reject) => {

        this.findOne({
            '_id': postId,
            'createdBy': profileId
        })
            .exec((execError, post) => {

                if (execError || !post) {

                    logger.err('Error updating existing post.', execError, data);

                    reject({
                        'message': 'Internal Server Error',
                        'status': 500
                    });

                } else {

                    if (typeof data.title !== 'undefined') {

                        post.title = data.title;

                    }

                    if (typeof data.contents !== 'undefined') {

                        post.contents = data.contents;

                    }

                    post.editedBy = profileId;

                    post.save((saveError, results) => {

                        if (saveError || !results) {

                            logger.err('Error updating existing post.', saveError, data);

                            reject({
                                'message': 'Internal Server Error',
                                'status': 500
                            });

                        } else {

                            resolve(this.showPostById(postId));

                        }

                    });

                }

            });

    });

};

postSchema.statics.addMessageToPostById = function (postId, data, profileId) {

    return new Promise((resolve, reject) => {

        this.findOneAndUpdate(
            {
                '_id': postId
            },
            {
                '$push': {
                    'messages': {
                        'contents': data.contents,
                        'createdBy': profileId
                    }
                },
                '$set': {
                    'updatedAt': Date.now()
                }
            },
            {
                'new': true
            },
            (updateError, results) => {

                if (updateError || !results) {

                    logger.err('Error updating existing message.', updateError, data);

                    reject({
                        'message': 'Internal Server Error',
                        'status': 500
                    });

                } else {

                    resolve(this.showMessageById(postId, results.messages.slice(-1)[0]._id));

                }

            }
        );

    });

};

postSchema.statics.updateMessageToPostById = function (postId, messageId, data, profileId) {

    return new Promise((resolve, reject) => {

        this.findOneAndUpdate(
            {
                '_id': postId,
                'messages': {
                    '$elemMatch': {
                        '_id': messageId,
                        'createdBy': profileId
                    }
                }
            },
            {
                '$set': {
                    'messages.$.contents': data.contents,
                    'messages.$.editedBy': profileId,
                    'messages.$.updatedAt': Date.now(),
                    'updatedAt': Date.now()
                }
            },
            {
                'new': true
            },
            (updateError, results) => {

                if (updateError || !results) {

                    logger.err('Error updating existing message.', updateError, data);

                    reject({
                        'message': 'Internal Server Error',
                        'status': 500
                    });

                } else {

                    resolve(this.showMessageById(postId, messageId));

                }

            }
        );

    });

};

postSchema.statics.deletePostById = function (postId, profileId) {

    return new Promise((resolve, reject) => {

        this.findOneAndRemove(
            {
                '_id': postId,
                'createdBy': profileId
            },
            (removeError, post) => {

                if (removeError || !post) {

                    logger.err('Error deleting existing post.', removeError);

                    reject({
                        'message': 'Internal Server Error',
                        'status': 500
                    });

                } else {

                    resolve([]);

                }

            }
        );

    });

};

postSchema.statics.deleteMessageFromPostById = function (postId, messageId, profileId) {

    return new Promise((resolve, reject) => {

        this.findOneAndUpdate(
            {
                '_id': postId,
                'messages': {
                    '$elemMatch': {
                        '_id': messageId,
                        'createdBy': profileId
                    }
                }
            },
            {
                '$pull': {
                    'messages': {
                        '$elemMatch': {
                            '_id': messageId,
                            'createdBy': profileId
                        }
                    }
                },
                '$set': {
                    'updatedAt': Date.now()
                }
            },
            {
                'new': true,
                'upsert': true
            },
            (updateError, results) => {

                if (updateError || !results) {

                    logger.err('Error deleting existing message.', updateError);

                    reject({
                        'message': 'Internal Server Error',
                        'status': 500
                    });

                } else {

                    resolve([]);

                }

            }
        );

    });

};

postSchema.statics.showPostById = function (postId) {

    return new Promise((resolve, reject) => {

        this.findByIdAndUpdate(postId, {
            '$inc': {
                'views': 1
            }
        })
            .populate('createdBy')
            .populate('editedBy')
            .populate('messages.createdBy')
            .populate('messages.editedBy')
            .exec((updateError, results) => {

                if (updateError || !results) {

                    logger.err(`Post id ${postId} not found.`);

                    reject({
                        'message': 'Post not found.',
                        'status': 404
                    });

                } else {

                    resolve(results);

                }

            });

    });

};

postSchema.statics.showMessageById = function (postId, messageId) {

    return new Promise((resolve, reject) => {

        this.find({
            'messages._id': messageId
        }, {
            'messages.$': true
        })
            .populate('messages.createdBy')
            .populate('messages.editedBy')
            .exec((findError, results) => {

                if (findError || !results || !results[0] || !results[0].messages) {

                    logger.err(`Message id ${messageId} not found.`);

                    reject({
                        'message': 'Message not found.',
                        'status': 404
                    });

                } else {

                    resolve(results[0].messages[0]);

                }

            });

    });

};

postSchema.statics.listPosts = function () {

    return new Promise((resolve, reject) => {

        this.find()
            .populate('createdBy')
            .populate('editedBy')
            .sort({
                'pinned': -1,
                'updatedAt': -1
            })
            .select('createdAt updatedAt views title slug contents messageCount createdBy editedBy')
            .exec((findError, results) => {

                if (findError || !results) {

                    logger.err('Error retrieving post list.', findError);

                    reject({
                        'message': 'Internal Server Error',
                        'status': 500
                    });

                } else {

                    resolve(results);

                }

            });

    });

};

postSchema.statics.listMessagesByPostId = function (postId) {

    return new Promise((resolve, reject) => {

        this.findByIdAndUpdate(postId, {
            '$inc': {
                'views': 1
            }
        })
            .populate('createdBy')
            .populate('editedBy')
            .populate('messages.createdBy')
            .populate('messages.editedBy')
            .exec((updateError, results) => {

                if (updateError || !results) {

                    logger.err(`Post id ${postId} not found.`);

                    reject({
                        'message': 'Post not found.',
                        'status': 404
                    });

                } else {

                    resolve(results.messages);

                }

            });

    });

};

postSchema.statics.searchPosts = function (query) {

    return new Promise((resolve, reject) => {

        if (query) {

            let modifiedQuery = query;

            modifiedQuery = modifiedQuery.trim().toLowerCase();
            modifiedQuery = modifiedQuery.replace(/[^0-9a-z]+/, '|').replace(/^\||\|$/, '');

            if (modifiedQuery) {

                this.find({
                    'title': {
                        '$regex': new RegExp(query, 'i')
                    }
                })
                    .populate('createdBy')
                    .populate('editedBy')
                    .sort({
                        'updatedAt': -1
                    })
                    .select('createdAt updatedAt views title slug contents messageCount createdBy editedBy')
                    .exec((findError, results) => {

                        if (findError || !results) {

                            logger.err('Error retrieving search results.', findError, query);

                            reject({
                                'message': 'Internal Server Error',
                                'status': 500
                            });

                        } else {

                            resolve(results);

                        }

                    });

            } else {

                resolve([]);

            }

        } else {

            resolve([]);

        }

    });

};

messageSchema.virtual('id').get(function () {

    return this._id.toHexString();

});

messageSchema.set('toJSON', {
    'virtuals': true
});

postSchema.post('findOneAndUpdate', (doc, next) => {

    if (doc && doc.messageCount !== doc.messages.length) {

        doc.messageCount = doc.messages.length;

        doc.save(next);

    }

    next();

});

postSchema.virtual('id').get(function () {

    return this._id.toHexString();

});

postSchema.set('toJSON', {
    'virtuals': true
});

module.exports = mongoose.model('post', postSchema);
