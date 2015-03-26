var assert = require('assert');

var mongoose = require('mongoose');

var postModel = require('../../../src/models/post');

describe('post model', function () {

    var postId = null;

    before(function (done) {

        mongoose.connect('mongodb://localhost/test');

        postModel.find().remove(done);

    });

    after(function (done) {

        postModel.find().remove(function () {

            mongoose.connection.close(done);

        });

    });

    it('should create post', function (done) {

        postModel.createPost({
            title: 'Lorem ipsum dolor sit amet',
            contents: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            createdBy: mongoose.Schema.ObjectID
        }).then(function (post) {

            postId = post.id;

            done();

        }).catch(done);

    });

    it('should be able to add message to post', function (done) {

        postModel.addMessageToPostById(postId, {
            contents: 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.',
            createdBy: mongoose.Schema.ObjectID
        }).then(function (post) {

            assert.equal(post.id, postId);

            done();

        }).catch(done);

    });

    it('should be able to show post', function (done) {

        postModel.showPostById(postId).then(function (post) {

            assert.equal(post.id, postId);

            done();

        }).catch(done);

    });

    it('should be able to list posts', function (done) {

        postModel.listPosts().then(function (posts) {

            assert.equal(posts.length, 1);

            done();

        }).catch(done);

    });

    it('should be able to search posts', function (done) {

        postModel.searchPosts('lorem').then(function (posts) {

            assert.equal(posts.length, 1);

            done();

        }).catch(done);

    });

});
