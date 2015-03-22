var assert = require('assert');

var mongoose = require('mongoose');

var profileModel = require('../../../src/models/profile');
var postModel = require('../../../src/models/post');

describe('profile model', function () {

    var profileId = null;

    before(function (done) {

        mongoose.connect('mongodb://localhost/test');

        profileModel.find().remove(done);

    });

    after(function (done) {

        profileModel.find().remove(function () {

            mongoose.connection.close();

            done();

        });

    });

    it('should create profile', function (done) {

        profileModel.createProfile('twitter', {
            id: '12603',
            name: 'neogeek',
            avatar: 'https://pbs.twimg.com/profile_images/521442109727838209/IyeKD7Rx_bigger.jpeg'
        }).then(function (profile) {

            profileId = profile.id;

            done();

        }).catch(done);

    });

    it('should update profile', function (done) {

        profileModel.updateProfileById(profileId, {
            locale: 'pt-br'
        }).then(function (profile) {

            assert.equal(profile.locale, 'pt-br');

            done();

        }).catch(done);

    });

    it('should show profile', function (done) {

        profileModel.showProfileById(profileId).then(function (profile) {

            assert.equal(profile._id, profileId);
            assert.equal(profile.posts.length, 0);

            done();

        }).catch(done);

    });

});
