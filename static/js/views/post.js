define(function (require) {

    'use strict';

    var _ = require('underscore');

    var Marionette = require('marionette'),
        templates = require('templates');

    var MessagesView = require('views/messages');

    return Marionette.ItemView.extend({

        el: '.page-content .inner-wrapper',

        template: templates.partials.post_header,

        initialize: function () {

            this.listenTo(this.model, 'sync', (function () {

                this.subview = new MessagesView({ collection: this.model.get('messages') });
                this.subview.setElement(this.$el.find('.messages'));

            }).bind(this));

        },

        render: function () {

            this.$el.find('.post').replaceWith(this.template(
                _.extend({}, this.model.toJSON(), { editable: true })
            ));

            if (this.model.get('messages')) {

                this.$el.find('.messages').empty();

                this.subview.setElement(this.$el.find('.messages'));
                this.subview.render();

            }

        }

    });

});
