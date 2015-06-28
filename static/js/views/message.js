define(function (require) {

    'use strict';

    var _ = require('underscore');

    var Marionette = require('marionette'),
        Handlebars = require('handlebars'),
        templates = require('templates');

    templates.partials = Handlebars.partials;

    return Marionette.ItemView.extend({

        events: {
            'click a[href="#edit"]': 'handleEditMessage',
            'click a[href="#delete"]': 'handleDeleteMessage',
            'submit form': 'handleSaveMessage',
            'click a[href="#cancel-edit"]': 'handleCancelEditMessage'
        },

        template: templates.partials.post_message,

        render: function () {

            this.$el.html(this.template(
                _.extend({}, this.model.toJSON(), { editable: true })
            ));

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

        }

    });

});
