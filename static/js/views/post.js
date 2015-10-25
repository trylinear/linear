define(function (require) {

    'use strict';

    var _ = require('underscore');

    var Marionette = require('marionette'),
        templates = require('templates');

    var MessageCreateView = require('views/message-create');
    var MessagesView = require('views/messages');

    var EditorView = require('./editor');

    return Marionette.ItemView.extend({

        el: '.page-content .inner-wrapper',

        events: {
            'keydown .post textarea[name="contents"]': 'handleKeyDownEvent',
            'click .post a[href="#edit"]': 'handleEditPost',
            'click .post a[href="#delete"]': 'handleDeletePost',
            'submit .post form': 'handleSavePost',
            'click .post a[href="#cancel-edit"]': 'handleCancelEditPost',
        },

        template: templates.partials.post_header,

        initialize: function () {

            this.editor = new EditorView();
            this.setupEditor();

            var createMessage = new MessageCreateView({
                el: this.$el.find('.message-create')
            });

            createMessage.parentPost = this;

            this.listenTo(this.model, 'sync', function () {

                this.subview = new MessagesView({ collection: this.model.get('messages') });
                this.subview.setElement(this.$el.find('.messages'));

                if (this.model.get('messages')) {

                    this.$el.find('.messages').empty();

                    this.subview.setElement(this.$el.find('.messages'));
                    this.subview.render();

                }

            }.bind(this));

        },

        render: function () {

            this.$el.find('.post').replaceWith(this.template(
                _.extend({}, this.model.toJSON(), {
                    editable: this.model.get('createdBy')._id === sessionStorage.getItem('profileId')
                })
            ));

            this.setupEditor();

        },

        setupEditor: function () {

            this.editor.setElement(this.$el.find('.post .markdown-editor'));
            this.editor.delegateEvents();

        },

        remove: function () {

            window.location.href = '/';

        },

        handleKeyDownEvent: function (e) {

            if (e.metaKey && e.keyCode === 13) {

                e.preventDefault();

                this.handleSavePost(e);

                return false;

            }

        },

        handleEditPost: function (e) {

            e.preventDefault();

            this.template = templates.partials.post_header_form;

            this.render();

        },

        handleCancelEditPost: function (e) {

            e.preventDefault();

            this.template = templates.partials.post_header;

            this.render();

        },

        handleDeletePost: function (e) {

            e.preventDefault();

            if (window.confirm('Are you sure you want to delete this post?')) {

                this.model.destroy();

            }

        },

        handleSavePost: function (e) {

            e.preventDefault();

            this.model.set({
                title: this.$el.find('[name="title"]').val(),
                contents: this.editor.value()
            });

            this.template = templates.partials.post_header;

            this.model.save().done(this.render);

        }

    });

});
