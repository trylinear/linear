define(function (require) {

    'use strict';

    var _ = require('underscore');

    var Marionette = require('marionette'),
        templates = require('templates');

    var markdown = require('markdown-it')();

    markdown.use(require('markdown-it-emoji'));

    var MessageCreateView = require('views/message-create');
    var MessagesView = require('views/messages');

    return Marionette.ItemView.extend({

        el: '.page-content .inner-wrapper',

        template: templates.partials.post_header,

        initialize: function () {

            var createMessage = new MessageCreateView({
                el: this.$el.find('.message-create')
            });

            createMessage.parentPost = this;

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

        }

    });

});
