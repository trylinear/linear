define(function (require) {

    'use strict';

    var _ = require('underscore');

    var Marionette = require('marionette'),
        templates = require('templates');

    var markdown = require('markdown-it')();

    markdown.use(require('markdown-it-emoji'));

    var MessagesView = require('views/messages');

    return Marionette.ItemView.extend({

        el: '.page-content .inner-wrapper',

        events: {
            'keydown textarea[name="contents"]': 'handleKeyDownEvent',
            'submit .message-create form': 'handleSubmitMessage',
            'click a[href="#markdown-toggle"]': 'handleMarkdownToggle'
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

        handleKeyDownEvent: function (e) {

            if (e.metaKey && e.keyCode === 13) {

                e.preventDefault();

                this.handleSubmitMessage(e);

                return false;

            }

        },

        handleSubmitMessage: function (e) {

            var MessageModel = require('models/message'),
                model = new MessageModel({ contents: this.$el.find('.markdown-contents').val() });

            model.url = '/api/v1/posts/' + this.model.get('id') + '/messages/';

            e.preventDefault();

            model.save().done(function () {

                this.subview.collection.add(model);

                this.$el.find('.markdown-contents').val('');

            }.bind(this));

        },

        handleMarkdownToggle: function (e) {

            e.preventDefault();

            var $markdownContents = this.$el.find('.markdown-contents'),
                $markdownPreview = this.$el.find('.markdown-preview');

            $markdownPreview.html(markdown.render($markdownContents.val()));

            $markdownContents.toggle();
            $markdownPreview.toggle();

        }

    });

});
