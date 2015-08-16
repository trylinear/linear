var q = require('q');

var _ = require('underscore');

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var postModel = require('../models/post');

var logger = require('../utils/logger');

var socialSchema = new mongoose.Schema({
    type: String,
    id: String,
    _id: false
});

var profileSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    name: String,
    avatar: String,
    social: [socialSchema],
    locale: { type: String, default: 'en-us' }
});

profileSchema.plugin(findOrCreate);

profileSchema.statics.createProfile = function (type, data) {

    var deferred = new q.defer();

    this.findOrCreate(
        { 'social.type': type, 'social.id': data.id },
        {
            name: data.name,
            avatar: data.avatar,
            social: [ { type: type, id: data.id } ]
        },
        { upsert: true },
        function (err, profile) {

            if (err || !profile) {

                logger.err('Error saving profile.', err, data);

                deferred.reject({
                    status: 500,
                    message: 'Internal Server Error'
                });

            } else { deferred.resolve(profile); }

        }
    );

    return deferred.promise;

};

profileSchema.statics.updateProfileById = function (profileId, data) {

    var deferred = new q.defer();

    this.findById(profileId)
        .exec(function (err, profile) {

            if (data.locale) {

                profile.locale = data.locale;

            }

            profile.save(function (err, profile) {

                if (err || !profile) {

                    logger.err('Error saving profile ' + profileId + '.', err, data);

                    deferred.reject({
                        status: 500,
                        message: 'Internal Server Error'
                    });

                } else { deferred.resolve(profile); }

            });

        });

    return deferred.promise;

};

profileSchema.statics.showProfileById = function (profileId) {

    var deferred = new q.defer();

    this.findById(profileId)
        .lean()
        .exec(function (err, profile) {

            if (err || !profile) {

                logger.err('Profile id ' + profileId + ' not found.');

                deferred.reject({
                    status: 404,
                    message: 'Profile not found.'
                });

            } else {

                postModel.find({ createdBy: profileId })
                    .populate('createdBy')
                    .sort({ createdAt: -1 })
                    .select('createdAt updatedAt views title slug contents messageCount createdBy')
                    .exec(function (err, posts) {

                        if (err || !posts) {

                            logger.err('Error retriving posts for profile id ' + profileId + '.');

                            deferred.reject({
                                status: 500,
                                message: 'Internal Server Error'
                            });

                        } else { deferred.resolve(_.assign(profile, { posts: posts })); }

                    });

            }

        });

    return deferred.promise;

};

profileSchema.pre('save', function (next) {

    this.updatedAt = Date.now();

    next();

});

module.exports = mongoose.model('profile', profileSchema);
