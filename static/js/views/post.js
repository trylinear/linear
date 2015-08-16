define(function (require) {

    'use strict';

    var _ = require('underscore');

    var Marionette = require('marionette'),
        templates = require('templates');

    var MessagesView = require('views/messages');

    return Marionette.ItemView.extend({

        el: '.page-content .inner-wrapper',

        events: {
            'submit .message-create form': 'handleSubmitMessage',
        },

        template: templates.partials.post_header,

        initialize: function () {

            this.listenTo(this.model, 'sync', function () {

                this.subview = new MessagesView({ collection: this.model.get('messages') });
                this.subview.setElement(this.$el.find('.messages'));

            }.bind(this));

        },

        render: function () {

            this.$el.find('.post').replaceWith(this.template(
                _.extend({}, this.model.toJSON(), { editable: false })
            ));

            if (this.model.get('messages')) {

                this.$el.find('.messages').empty();

                this.subview.setElement(this.$el.find('.messages'));
                this.subview.render();

            }

        },

        handleSubmitMessage: function (e) {

            var MessageModel = require('models/message'),
                model = new MessageModel({ contents: this.$el.find('.markdown-contents').val() });

            model.url = '/api/v1/posts/' + this.model.get('id') + '/messages/';

            e.preventDefault();

            model.save().done(function () {

                this.subview.collection.add(model);

            }.bind(this));

        }

    });

});
