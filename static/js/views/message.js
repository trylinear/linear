define(function (require) {

    'use strict';

    var _ = require('underscore');

    var Marionette = require('marionette'),
        Handlebars = require('handlebars'),
        templates = require('templates');

    var markdown = require('markdown-it')();

    markdown.use(require('markdown-it-emoji'));

    templates.partials = Handlebars.partials;

    return Marionette.ItemView.extend({

        events: {
            'keydown textarea[name="contents"]': 'handleKeyDownEvent',
            'click a[href="#edit"]': 'handleEditMessage',
            'click a[href="#delete"]': 'handleDeleteMessage',
            'submit form': 'handleSaveMessage',
            'click a[href="#cancel-edit"]': 'handleCancelEditMessage',
            'click a[href="#markdown-toggle"]': 'handleMarkdownToggle'
        },

        template: templates.partials.post_message,

        render: function () {

            this.$el.html(this.template(
                _.extend({}, this.model.toJSON(), {
                    editable: this.model.get('createdBy')._id === sessionStorage.getItem('profileId')
                })
            ));

        },

        remove: function () {

            this.$el.fadeOut(200, function () {

                this.$el.remove();

            }.bind(this));

        },

        handleKeyDownEvent: function (e) {

            if (e.metaKey && e.keyCode === 13) {

                e.preventDefault();

                this.handleSaveMessage(e);

                return false;

            }

        },

        handleEditMessage: function (e) {

            e.preventDefault();

            this.template = templates.partials.post_message_form;

            this.render();

        },

        handleCancelEditMessage: function (e) {

            e.preventDefault();

            this.template = templates.partials.post_message;

            this.render();

        },

        handleDeleteMessage: function (e) {

            e.preventDefault();

            if (window.confirm('Are you sure you want to delete this message?')) {

                this.model.destroy();

            }

        },

        handleSaveMessage: function (e) {

            e.preventDefault();

            this.model.set({
                contents: this.$el.find('.markdown-contents').val()
            });

            this.template = templates.partials.post_message;

            this.model.save().done(this.render);

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
