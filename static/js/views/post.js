define(function (require) {

    'use strict';

    var Marionette = require('marionette'),
        templates = require('templates');

    var MessagesView = require('views/messages');

    return Marionette.ItemView.extend({

        el: '.page-content .inner-wrapper',

        template: templates.post,

        initialize: function () {

            this.listenTo(this.model, 'sync', (function () {

                this.subview = new MessagesView({ collection: this.model.get('messages') });

            }).bind(this));

        },

        render: function () {

            this.$el.html(this.template({ post: this.model.toJSON() }));

            if (this.model.get('messages')) {

                this.$el.find('.messages').empty();

                this.subview.setElement(this.$el.find('.messages'));
                this.subview.render();

            }

        }

    });

});
