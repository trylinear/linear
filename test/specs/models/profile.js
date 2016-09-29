const expect = require('chai').expect;

const mongoose = require('mongoose');

const profileModel = require('../../../src/models/profile');

describe('profile model', () => {

    let profileId = null;

    before(done => {

        mongoose.connect('mongodb://localhost/test');

        profileModel.find().remove(done);

    });

    after(done => {

        profileModel.find().remove(() => {

            mongoose.connection.close(done);

        });

    });

    it('should create profile', done => {

        profileModel.createProfile('twitter', {
            'avatar': 'https://pbs.twimg.com/profile_images/521442109727838209/IyeKD7Rx_bigger.jpeg',
            'id': '12603',
            'name': 'neogeek'
        }).then(profile => {

            expect(profile).to.have.property('id');
            expect(profile.id).to.be.a('string');

            profileId = profile.id;

            done();

        });

    });

    it('should error when trying to create profile without a name', done => {

        profileModel.createProfile('twitter', {
            'avatar': '',
            'id': '',
            'name': ''
        }).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should update profile', done => {

        profileModel.updateProfileById(profileId, {
            'locale': 'pt-br'
        }).then(profile => {

            expect(profile).to.have.property('_id');
            expect(profile._id.equals(profileId)).to.equal(true);

            expect(profile).to.have.property('locale');
            expect(profile.locale).to.be.a('string');
            expect(profile.locale).to.equal('pt-br');

            done();

        });

    });

    it('should error when trying to update profile with invalid profileId', done => {

        profileModel.updateProfileById(mongoose.Types.ObjectId(), {
            'locale': 'en-us'
        }).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should show profile', done => {

        profileModel.showProfileById(profileId).then(profile => {

            expect(profile).to.have.property('_id');
            expect(profile._id.equals(profileId)).to.equal(true);

            expect(profile.posts).to.have.length(0);

            done();

        });

    });

    it('should error on invalid profileId', done => {

        profileModel.showProfileById('invalid').catch(err => {

            expect(err.status).to.equal(404);

            done();

        });

    });

});
