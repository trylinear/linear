const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

mongoose.Promise = global.Promise;

const postModel = require('../models/post');

const logger = require('../utils/logger');

const socialSchema = new mongoose.Schema({
    '_id': false,
    'id': String,
    'type': String
});

const profileSchema = new mongoose.Schema({
    'avatar': String,
    'createdAt': {
        'default': Date.now,
        'type': Date
    },
    'locale': {
        'default': 'en-us',
        'type': String
    },
    'name': {
        'required': true,
        'type': String
    },
    'social': [socialSchema],
    'updatedAt': {
        'default': Date.now,
        'type': Date
    }
});

profileSchema.plugin(findOrCreate);

profileSchema.statics.createProfile = function (type, data) {

    return new Promise((resolve, reject) => {

        this.findOrCreate(
            {
                'social.id': data.id,
                'social.type': type
            },
            {
                'avatar': data.avatar,
                'name': data.name,
                'social': [
                    {
                        'id': data.id,
                        type
                    }
                ]
            },
            {
                'upsert': true
            },
            (createError, results) => {

                if (createError || !results) {

                    logger.err('Error saving profile.', createError, data);

                    reject({
                        'message': 'Internal Server Error',
                        'status': 500
                    });

                } else {

                    resolve(results);

                }

            }
        );

    });

};

profileSchema.statics.updateProfileById = function (profileId, data) {

    return new Promise((resolve, reject) => {

        this.findOneAndUpdate(
            {
                '_id': profileId
            },
            {
                '$set': {
                    'locale': data.locale,
                    'updatedAt': Date.now()
                }
            },
            {
                'new': true
            },
            (updateError, results) => {

                if (updateError || !results) {

                    logger.err(`Error saving profile ${profileId}.`, updateError, data);

                    reject({
                        'message': 'Internal Server Error',
                        'status': 500
                    });

                } else {

                    resolve(results);

                }

            }
        );

    });

};

profileSchema.statics.showProfileById = function (profileId) {

    return new Promise((resolve, reject) => {

        this.findById(profileId)
            .exec((findByIdError, profile) => {

                if (findByIdError || !profile) {

                    logger.err(`Profile id ${profileId} not found.`);

                    reject({
                        'message': 'Profile not found.',
                        'status': 404
                    });

                } else {

                    postModel.find({
                        'createdBy': profileId
                    })
                        .populate('createdBy')
                        .sort({
                            'createdAt': -1
                        })
                        .select('createdAt updatedAt views title slug contents messageCount createdBy')
                        .exec((findError, posts) => {

                            if (findError || !posts) {

                                logger.err(`Error retriving posts for profile id ${profileId}.`);

                                reject({
                                    'message': 'Internal Server Error',
                                    'status': 500
                                });

                            } else {

                                resolve(Object.assign({}, profile.toJSON(), {posts}));

                            }

                        });

                }

            });

    });

};

profileSchema.virtual('id').get(function () {

    return this._id.toHexString();

});

profileSchema.set('toJSON', {
    'virtuals': true
});

module.exports = mongoose.model('profile', profileSchema);
