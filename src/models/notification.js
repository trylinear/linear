var q = require('q');

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var logger = require('../utils/logger');

var notificationSchema = new mongoose.Schema({
    updatedAt: { type: Date, default: Date.now },
    unread: { type: Number, default: 0 },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' }
});

notificationSchema.plugin(findOrCreate);

notificationSchema.statics.listUnread = function (profileId) {

    var deferred = new q.defer();

    this.find({ profileId: profileId, unread: 1 })
        .populate('post')
        .sort({ updatedAt: -1 })
        .exec(function (err, notifications) {

            if (err || !notifications) {

                logger.err('Error listing unread notifications.', err, profileId);

                deferred.reject({
                    status: 500,
                    message: 'Internal Server Error'
                });

            } else { deferred.resolve(notifications); }

        });

    return deferred.promise;

};

notificationSchema.statics.markAsUnread = function (postId, profileId) {

    var deferred = new q.defer();

    var model = this;

    this.findOrCreate(
        { post: postId, profileId: profileId },
        { unread: 0 },
        { upsert: true },
        function () {

            model.update(
                { post: postId, profileId: { '$ne': profileId } },
                { updatedAt: Date.now(), unread: 1 },
                { multi: true },
                function (err, notifications) {

                    if (err || !notifications) {

                        logger.err('Error marking notifications as unread.', err, profileId);

                        deferred.reject({
                            status: 500,
                            message: 'Internal Server Error'
                        });

                    } else { deferred.resolve(notifications); }

                }
            );

        }
    );

    return deferred.promise;

};

notificationSchema.statics.markAsRead = function (postId, profileId) {

    var deferred = new q.defer();

    this.update(
        { post: postId, profileId: profileId },
        { unread: 0 },
        function (err, notifications) {

            if (err || !notifications) {

                logger.err('Error marking notifications as read.', err, profileId);

                deferred.reject({
                    status: 500,
                    message: 'Internal Server Error'
                });

            } else { deferred.resolve(notifications); }

        }
    );

    return deferred.promise;

};

module.exports = mongoose.model('notification', notificationSchema);
