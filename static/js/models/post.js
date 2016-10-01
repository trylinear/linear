const Backbone = require('backbone');

const MessagesCollection = require('../collections/messages');

module.exports = Backbone.Model.extend({

    initialize () {

        this.on('sync', () => {

            if (this.attributes.messages) {

                this.attributes.messages = new MessagesCollection(this.attributes.messages);
                this.attributes.messages.url = `/api/v1/posts/${this.get('id')}/messages/`;

            }

        });

    },

    'urlRoot': '/api/v1/posts/'

});
