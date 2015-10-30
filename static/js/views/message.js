define(function (require) {

    'use strict';

    var _ = require('underscore');

    var Marionette = require('marionette'),
        Handlebars = require('handlebars'),
        templates = require('templates');

    templates.partials = Handlebars.partials;

    var EditorView = require('./editor');

    return Marionette.ItemView.extend({

        events: {
            'keydown textarea[name="contents"]': 'handleKeyDownEvent',
            'click a[href="#edit"]': 'handleEditMessage',
            'click a[href="#delete"]': 'handleDeleteMessage',
            'submit form': 'handleSaveMessage',
            'click a[href="#cancel-edit"]': 'handleCancelEditMessage',
        },

        initialize: function (config) {

            this.editor = new EditorView();
            this.setupEditor();

            this.config = config;

            if (!this.config.templates) {

                this.config.templates =  {
                    view: templates.partials.post_message,
                    edit: templates.partials.post_message_form
                };

            }

            this.template = this.config.templates.view;

        },

        render: function () {

            this.$el.html(this.template(
                _.extend({}, this.model.toJSON(), {
                    editable: this.model.get('createdBy')._id === sessionStorage.getItem('profileId')
                })
            ));

            this.setupEditor();

        },

        setupEditor: function () {

            this.editor.setElement(this.$el.find('.markdown-editor'));
            this.editor.delegateEvents();

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

            this.template = this.config.templates.edit;

            this.render();

        },

        handleCancelEditMessage: function (e) {

            e.preventDefault();

            this.template = this.config.templates.view;

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
                contents: this.editor.value()
            });

            this.template = this.config.templates.view;

            this.model.save().done(this.render);

        }

    });

});
