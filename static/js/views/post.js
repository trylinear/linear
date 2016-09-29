define(function (require) {

    'use strict';

    var Marionette = require('marionette'),
        Handlebars = require('handlebars'),
        templates = require('templates');

    templates.partials = Handlebars.partials;

    var MessageCreateView = require('views/message-create');
    var MessagesView = require('views/messages');
    var MessageView = require('views/message');

    return Marionette.ItemView.extend({

        el: '.page-content .inner-wrapper',

        initialize: function () {

            var createMessage = new MessageCreateView({
                el: this.$el.find('.message-create')
            });

            createMessage.parentPost = this;

            this.listenToOnce(this.model, 'sync', function () {

                var post = new MessageView({
                    el: this.$el.find('.post-header'),
                    model: this.model,
                    templates: {
                        view: templates.partials.post_header,
                        edit: templates.partials.post_header_form
                    }
                });
                post.render();

                if (this.model.get('messages')) {

                    this.$el.find('.messages').empty();

                    this.subview = new MessagesView({
                        el: this.$el.find('.messages'),
                        collection: this.model.get('messages')
                    });
                    this.subview.render();

                }

            }.bind(this));

        }

    });

});
