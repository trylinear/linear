var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    contents: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' }
});

var postSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    title: String,
    slug: String,
    contents: String,
    messageCount: { type: Number, default: 0 },
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

postSchema.statics.addMessageToPostById = function (postId, data, callback) {

    this.findById(postId)
        .exec(function (err, post) {

            post.messages.push({
                contents: data.contents,
                createdBy: data.createdBy
            });

            post.save(callback);

        });

};

postSchema.statics.showPostById = function (postId, callback) {

    this.findByIdAndUpdate(postId, { $inc: { views: 1 } })
        .populate('createdBy')
        .populate('messages.createdBy')
        .exec(callback);

};

postSchema.statics.listPosts = function (callback) {

    this.find()
        .populate('createdBy')
        .sort({ updatedAt: -1 })
        .select('createdAt updatedAt views title slug contents messageCount createdBy')
        .exec(callback);

};

postSchema.pre('save', function (next) {

    this.updatedAt = Date.now();
    this.messageCount = this.messages.length;

    next();

});

module.exports = mongoose.model('post', postSchema);
