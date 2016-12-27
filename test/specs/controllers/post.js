const expect = require('chai').expect;

const mongoose = require('mongoose');

const postModel = require('../../../src/models/post');
const postController = require('../../../src/controllers/post');
const messageController = require('../../../src/controllers/message');
const searchController = require('../../../src/controllers/search');

describe('post controller', () => {

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

        postController.create({
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

        postController.create({
            'title': ''
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to add message to post', done => {

        messageController.create(postId, {
            'contents': 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.'
        }, profileId).then(message => {

            expect(message).to.have.property('id');
            expect(message.id).to.be.a('string');

            messageId = message.id;

            done();

        });

    });

    it('should error to add message to post with an invalid postId', done => {

        messageController.create(mongoose.Types.ObjectId(), {
            'contents': 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to show post', done => {

        postController.show(postId).then(post => {

            expect(post).to.have.property('_id');
            expect(post._id.equals(postId)).to.equal(true);

            done();

        });

    });

    it('should error on invalid postId', done => {

        postController.show('invalid').catch(err => {

            expect(err.status).to.equal(404);

            done();

        });

    });

    it('should be able to show message', done => {

        messageController.show(postId, messageId).then(message => {

            expect(message).to.have.property('_id');
            expect(message._id.equals(messageId)).to.equal(true);

            done();

        });

    });

    it('should error on invalid messageId', done => {

        messageController.show(postId, mongoose.Types.ObjectId()).catch(err => {

            expect(err.status).to.equal(404);

            done();

        });

    });

    it('should be able to list posts', done => {

        postController.list().then(posts => {

            expect(posts).to.have.length(1);

            done();

        });

    });

    it('should be able to list messages by postId', done => {

        messageController.list(postId).then(messages => {

            expect(messages).to.have.length(1);

            done();

        });

    });

    it('should error on invalid postId for message list', done => {

        messageController.list('invalid').catch(err => {

            expect(err.status).to.equal(404);

            done();

        });

    });

    it('should be able to search posts', done => {

        searchController.show('lorem').then(posts => {

            expect(posts).to.have.length(1);

            done();

        });

    });

    it('should be able to search posts (with no query)', done => {

        searchController.show('').then(posts => {

            expect(posts).to.have.length(0);

            done();

        });

    });

    it('should be able to search posts (with invalid query)', done => {

        searchController.show('&^%').then(posts => {

            expect(posts).to.have.length(0);

            done();

        });

    });

    it('should be able to search posts (with no results)', done => {

        searchController.show('sports').then(posts => {

            expect(posts).to.have.length(0);

            done();

        });

    });

    it('should be able to update post by postId', done => {

        postController.update(postId, {
            'contents': 'test',
            'title': 'Test'
        }, profileId).then(post => {

            expect(post.title).to.be.equal('Test');
            expect(post.contents).to.be.equal('test');

            done();

        });

    });

    it('should error when trying to update post by invalid postId', done => {

        postController.update(mongoose.Types.ObjectId(), {
            'contents': 'test',
            'title': 'Test'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should error when trying to update post by postId when not the original author', done => {

        postController.update(postId, {
            'contents': 'test',
            'title': 'Test'
        }, mongoose.Types.ObjectId()).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should error when trying to update post by postId when removing the title', done => {

        postController.update(postId, {
            'title': ''
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to update messages in a post by postId and messageId', done => {

        messageController.update(postId, messageId, {
            'contents': 'test'
        }, profileId).then(message => {

            expect(message.contents).to.be.equal('test');

            done();

        });

    });

    it('should error when trying to update messages in a post by invalid postId', done => {

        messageController.update(mongoose.Types.ObjectId(), messageId, {
            'contents': 'test'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to delete messages in a post by postId and messageId', done => {

        messageController.create(postId, {
            'contents': 'test2'
        }, profileId).then(message => {

            messageController.list(postId).then(beforeMessages => {

                messageController.delete(postId, message.id, profileId).then(() => {

                    messageController.list(postId).then(afterMessages => {

                        console.log(beforeMessages.length);
                        console.log(afterMessages.length);

                        expect(beforeMessages.length - 1).to.equal(afterMessages.length);

                    });

                    done();

                });

            });

        });

    });

    it('should error when trying to delete messages in a post by invalid postId', done => {

        messageController.delete(mongoose.Types.ObjectId(), messageId, {
            'contents': 'test'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should error when trying to delete messages in a post by invalid messageId', done => {

        messageController.delete(postId, mongoose.Types.ObjectId(), {
            'contents': 'test'
        }, profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

    it('should be able to delete post by postId', done => {

        postController.delete(postId, profileId).then(post => {

            expect(post).to.have.length(0);

            done();

        });

    });

    it('should error when trying to delete post by invalid postId', done => {

        postController.delete(mongoose.Types.ObjectId(), profileId).catch(err => {

            expect(err.status).to.equal(500);

            done();

        });

    });

});
