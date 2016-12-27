const Marionette = require('backbone.marionette');
const Handlebars = require('handlebars');

require('../../templates/helpers');
require('../../templates/partials');
require('../../templates/views');

const MessageCreateView = require('./message-create');
const MessagesView = require('./messages');
const MessageView = require('./message');

module.exports = Marionette.View.extend({

    'el': '.page-content .inner-wrapper',

    initialize () {

        const createMessage = new MessageCreateView({
            'el': this.$el.find('.message-create')
        });

        createMessage.parentPost = this;

        this.listenToOnce(this.model, 'sync', () => {

            const post = new MessageView({
                'el': this.$el.find('.post-header'),
                'model': this.model,
                'templates': {
                    'edit': Handlebars.partials.post_header_form,
                    'view': Handlebars.partials.post_header
                }
            });

            post.render();

            if (this.model.get('messages')) {

                this.$el.find('.messages').empty();

                this.subview = new MessagesView({
                    'collection': this.model.get('messages'),
                    'el': this.$el.find('.messages')
                });
                this.subview.render();

            }

        });

    }

});
