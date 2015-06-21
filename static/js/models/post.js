define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    var MessagesCollection = require('collections/messages');

    return Backbone.Model.extend({

        urlRoot: '/api/v1/posts/',

        initialize: function () {

            this.on('sync', (function () {

                if (this.attributes.messages) {

                    this.attributes.messages = new MessagesCollection(this.attributes.messages);
                    this.attributes.messages.url = '/api/v1/posts/' + this.get('id') + '/messages/';

                }

            }).bind(this));

        }

    });

});
