require('with-env')();

var expect = require('chai').expect;

var mongoose = require('mongoose');

var postModel = require('../../../src/models/post');

describe('post model', function () {

    var postId = null,
        messageId = null,
        profileID = mongoose.Types.ObjectId();

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
            contents: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }, profileID).then(function (post) {

            expect(post).to.have.property('id');
            expect(post.id).to.be.a('string');

            postId = post.id;

            done();

        });

    });

    it('should error while trying to create a post without a title', function (done) {

        postModel.createPost({
            title: ''
        }, profileID).catch(function (err) {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to add message to post', function (done) {

        postModel.addMessageToPostById(postId, {
            contents: 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.'
        }, profileID).then(function (message) {

            expect(message).to.have.property('id');
            expect(message.id).to.be.a('string');

            messageId = message.id;

            done();

        });

    });

    it('should be able to show post', function (done) {

        postModel.showPostById(postId).then(function (post) {

            expect(post).to.have.property('_id');
            expect(post._id.equals(postId)).to.equal(true);

            done();

        });

    });

    it('should error on invalid postId', function (done) {

        postModel.showPostById('invalid').catch(function (err) {

            expect(err.status).to.equal(404);

            done();

        });

    });

    it('should be able to show message', function (done) {

        postModel.showMessageById(postId, messageId).then(function (message) {

            expect(message).to.have.property('_id');
            expect(message._id.equals(messageId)).to.equal(true);

            done();

        });

    });

    it('should error on invalid messageId', function (done) {

        postModel.showMessageById(postId, mongoose.Types.ObjectId()).catch(function (err) {

            expect(err.status).to.equal(404);

            done();

        });

    });

    it('should be able to list posts', function (done) {

        postModel.listPosts().then(function (posts) {

            expect(posts).to.have.length(1);

            done();

        });

    });

    it('should be able to list messages by postId', function (done) {

        postModel.listMessagesByPostId(postId).then(function (messages) {

            expect(messages).to.have.length(1);

            done();

        });

    });

    it('should error on invalid postId for message list', function (done) {

        postModel.listMessagesByPostId('invalid').catch(function (err) {

            expect(err.status).to.equal(404);

            done();

        });

    });

    it('should be able to search posts', function (done) {

        postModel.searchPosts('lorem').then(function (posts) {

            expect(posts).to.have.length(1);

            done();

        });

    });

    it('should be able to search posts (with no query)', function (done) {

        postModel.searchPosts('').then(function (posts) {

            expect(posts).to.have.length(0);

            done();

        });

    });

    it('should be able to search posts (with invalid query)', function (done) {

        postModel.searchPosts('&^%').then(function (posts) {

            expect(posts).to.have.length(0);

            done();

        });

    });

    it('should be able to search posts (with no results)', function (done) {

        postModel.searchPosts('sports').then(function (posts) {

            expect(posts).to.have.length(0);

            done();

        });

    });

    it('should be able to update post by postId', function (done) {

        postModel.updatePostById(postId, { title: 'Test', contents: 'test' }, profileID).then(function (post) {

            expect(post.title).to.be.equal('Test');
            expect(post.contents).to.be.equal('test');

            done();

        });

    });

    it('should error when trying to update post by invalid postId', function (done) {

        postModel.updatePostById(mongoose.Types.ObjectId(), { title: 'Test', contents: 'test' }, profileID).catch(function (err) {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should error when trying to update post by postId when not the original author', function (done) {

        postModel.updatePostById(postId, { title: 'Test', contents: 'test' }, mongoose.Types.ObjectId()).catch(function (err) {

            expect(err.status).to.equal(401);

            done();

        });

    });

    it('should error when trying to update post by postId when removing the title', function (done) {

        postModel.updatePostById(postId, { title: '' }, profileID).catch(function (err) {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to update messages in a post by postId and messageId', function (done) {

        postModel.updateMessageToPostById(postId, messageId, { contents: 'test' }, profileID).then(function (message) {

            expect(message.contents).to.be.equal('test');

            done();

        });

    });

    it('should be able to delete messages in a post by postId and messageId', function (done) {

        postModel.deleteMessageFromPostById(postId, messageId, { contents: 'test' }, profileID).then(function (messages) {

            expect(messages).to.have.length(0);

            done();

        });

    });

    it('should error when trying to delete messages in a post by invalid postId', function (done) {

        postModel.deleteMessageFromPostById(mongoose.Types.ObjectId(), messageId, { contents: 'test' }, profileID).catch(function (err) {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should error when trying to delete messages in a post by invalid messageId', function (done) {

        postModel.deleteMessageFromPostById(postId, mongoose.Types.ObjectId(), { contents: 'test' }, profileID).catch(function (err) {

            expect(err.status).to.equal(500);

            done();

        });

    });

});
