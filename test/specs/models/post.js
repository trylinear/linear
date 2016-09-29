const expect = require('chai').expect;

const mongoose = require('mongoose');

const postModel = require('../../../src/models/post');

describe('post model', () => {

    let postId = null;
    let messageId = null;
    const profileId = mongoose.Types.ObjectId();

    before(done => {

        mongoose.connect('mongodb://localhost/test');

        postModel.find().remove(done);

    });

    after(done => {

        postModel.find().remove(() => {

            mongoose.connection.close(done);

        });

    });

    it('should create post', done => {

        postModel.createPost({
            'contents': 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            'title': 'Lorem ipsum dolor sit amet'
        }, profileId).then(post => {

            expect(post).to.have.property('id');
            expect(post.id).to.be.a('string');

            postId = post.id;

            done();

        });

    });

    it('should error while trying to create a post without a title', done => {

        postModel.createPost({
            'title': ''
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to add message to post', done => {

        postModel.addMessageToPostById(postId, {
            'contents': 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.'
        }, profileId).then(message => {

            expect(message).to.have.property('id');
            expect(message.id).to.be.a('string');

            messageId = message.id;

            done();

        });

    });

    it('should error to add message to post with an invalid postId', done => {

        postModel.addMessageToPostById(mongoose.Types.ObjectId(), {
            'contents': 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to show post', done => {

        postModel.showPostById(postId).then(post => {

            expect(post).to.have.property('_id');
            expect(post._id.equals(postId)).to.equal(true);

            done();

        });

    });

    it('should error on invalid postId', done => {

        postModel.showPostById('invalid').catch(err => {

            expect(err.status).to.equal(404);

            done();

        });

    });

    it('should be able to show message', done => {

        postModel.showMessageById(postId, messageId).then(message => {

            expect(message).to.have.property('_id');
            expect(message._id.equals(messageId)).to.equal(true);

            done();

        });

    });

    it('should error on invalid messageId', done => {

        postModel.showMessageById(postId, mongoose.Types.ObjectId()).catch(err => {

            expect(err.status).to.equal(404);

            done();

        });

    });

    it('should be able to list posts', done => {

        postModel.listPosts().then(posts => {

            expect(posts).to.have.length(1);

            done();

        });

    });

    it('should be able to list messages by postId', done => {

        postModel.listMessagesByPostId(postId).then(messages => {

            expect(messages).to.have.length(1);

            done();

        });

    });

    it('should error on invalid postId for message list', done => {

        postModel.listMessagesByPostId('invalid').catch(err => {

            expect(err.status).to.equal(404);

            done();

        });

    });

    it('should be able to search posts', done => {

        postModel.searchPosts('lorem').then(posts => {

            expect(posts).to.have.length(1);

            done();

        });

    });

    it('should be able to search posts (with no query)', done => {

        postModel.searchPosts('').then(posts => {

            expect(posts).to.have.length(0);

            done();

        });

    });

    it('should be able to search posts (with invalid query)', done => {

        postModel.searchPosts('&^%').then(posts => {

            expect(posts).to.have.length(0);

            done();

        });

    });

    it('should be able to search posts (with no results)', done => {

        postModel.searchPosts('sports').then(posts => {

            expect(posts).to.have.length(0);

            done();

        });

    });

    it('should be able to update post by postId', done => {

        postModel.updatePostById(postId, {
            'contents': 'test',
            'title': 'Test'
        }, profileId).then(post => {

            expect(post.title).to.be.equal('Test');
            expect(post.contents).to.be.equal('test');

            done();

        });

    });

    it('should error when trying to update post by invalid postId', done => {

        postModel.updatePostById(mongoose.Types.ObjectId(), {
            'contents': 'test',
            'title': 'Test'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should error when trying to update post by postId when not the original author', done => {

        postModel.updatePostById(postId, {
            'contents': 'test',
            'title': 'Test'
        }, mongoose.Types.ObjectId()).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should error when trying to update post by postId when removing the title', done => {

        postModel.updatePostById(postId, {
            'title': ''
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to update messages in a post by postId and messageId', done => {

        postModel.updateMessageToPostById(postId, messageId, {
            'contents': 'test'
        }, profileId).then(message => {

            expect(message.contents).to.be.equal('test');

            done();

        });

    });

    it('should error when trying to update messages in a post by invalid postId', done => {

        postModel.updateMessageToPostById(mongoose.Types.ObjectId(), messageId, {
            'contents': 'test'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to delete messages in a post by postId and messageId', done => {

        postModel.deleteMessageFromPostById(postId, messageId, profileId).then(messages => {

            expect(messages).to.have.length(0);

            done();

        });

    });

    it('should error when trying to delete messages in a post by invalid postId', done => {

        postModel.deleteMessageFromPostById(mongoose.Types.ObjectId(), messageId, {
            'contents': 'test'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should error when trying to delete messages in a post by invalid messageId', done => {

        postModel.deleteMessageFromPostById(postId, mongoose.Types.ObjectId(), {
            'contents': 'test'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to delete post by postId', done => {

        postModel.deletePostById(postId, profileId).then(post => {

            expect(post).to.have.length(0);

            done();

        });

    });

    it('should error when trying to delete post by invalid postId', done => {

        postModel.deletePostById(mongoose.Types.ObjectId(), profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

});
