const Backbone = require('backbone');

const MessagesCollection = require('../collections/messages');

module.exports = Backbone.Model.extend({

    'initialize': function () {

        this.on('sync', function () {

            if (this.attributes.messages) {

                this.attributes.messages = new MessagesCollection(this.attributes.messages);
                this.attributes.messages.url = `/api/v1/posts/${this.get('id')}/messages/`;

            }

        }.bind(this));

    },

    'urlRoot': '/api/v1/posts/'

});
