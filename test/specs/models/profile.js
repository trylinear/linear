var expect = require('chai').expect;

var mongoose = require('mongoose');

var profileModel = require('../../../src/models/profile');

describe('profile model', function () {

    var profileId = null;

    before(function (done) {

        mongoose.connect('mongodb://localhost/test');

        profileModel.find().remove(done);

    });

    after(function (done) {

        profileModel.find().remove(function () {

            mongoose.connection.close(done);

        });

    });

    it('should create profile', function (done) {

        profileModel.createProfile('twitter', {
            id: '12603',
            name: 'neogeek',
            avatar: 'https://pbs.twimg.com/profile_images/521442109727838209/IyeKD7Rx_bigger.jpeg'
        }).then(function (profile) {

            expect(profile).to.have.property('id');
            expect(profile.id).to.be.a('string');

            profileId = profile.id;

            done();

        }).catch(done);

    });

    it('should update profile', function (done) {

        profileModel.updateProfileById(profileId, {
            locale: 'pt-br'
        }).then(function (profile) {

            expect(profile).to.have.property('_id');
            expect(profile._id.equals(profileId)).to.equal(true);

            expect(profile).to.have.property('locale');
            expect(profile.locale).to.be.a('string');
            expect(profile.locale).to.equal('pt-br');

            done();

        }).catch(done);

    });

    it('should show profile', function (done) {

        profileModel.showProfileById(profileId).then(function (profile) {

            expect(profile).to.have.property('_id');
            expect(profile._id.equals(profileId)).to.equal(true);

            expect(profile.posts).to.have.length(0);

            done();

        }).catch(done);

    });

});
