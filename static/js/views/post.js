const Marionette = require('backbone.marionette');
const Handlebars = require('handlebars');

require('../../templates/helpers');
require('../../templates/partials');
require('../../templates/views');

const MessageCreateView = require('./message-create');
const MessagesView = require('./messages');
const MessageView = require('./message');

module.exports = Marionette.View.extend({

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
                    view: Handlebars.partials.post_header,
                    edit: Handlebars.partials.post_header_form
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
