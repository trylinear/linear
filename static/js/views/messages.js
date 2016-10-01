const Marionette = require('backbone.marionette');

const MessageView = require('./message');

module.exports = Marionette.CollectionView.extend({
    'childView': MessageView
});
