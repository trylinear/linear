var mongoose = require('mongoose');

var profileModel = require('../models/profile');

var messageSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    contents: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' }
});

var postSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    title: String,
    slug: String,
    contents: String,
    messages: [messageSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' }
});

postSchema.statics.createPost = function (data, callback) {

    var post = new this({
        title: data.title,
        slug: data.title.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^\-|\-$/g, ''),
        contents: data.contents,
        createdBy: data.createdBy
    });

    post.save(callback);

};

postSchema.methods.addMessage = function (data, callback) {

    this.updated = Date.now();

    this.messages.push({
        contents: data.contents,
        createdBy: data.createdBy
    });

    this.save(callback);

};

module.exports = mongoose.model('post', postSchema);
