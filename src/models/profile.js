var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var socialSchema = new mongoose.Schema({
    type: String,
    id: String
});

var profileSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    name: String,
    avatar: { type: String },
    social: [socialSchema],
    locale: { type: String, default: 'en-us' }
});

profileSchema.plugin(findOrCreate);

profileSchema.statics.createProfile = function (type, data, callback) {

    this.findOrCreate(
        { 'social.type': type, 'social.id': data.id },
        {
            name: data.name,
            avatar: data.avatar,
            social: [ { type: type, id: data.id } ]
        },
        { upsert: true },
        callback
    );

};

module.exports = mongoose.model('profile', profileSchema);
