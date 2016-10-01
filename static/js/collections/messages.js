const Backbone = require('backbone');

const MessageModel = require('../models/message');

module.exports = Backbone.Collection.extend({
    'model': MessageModel
});
