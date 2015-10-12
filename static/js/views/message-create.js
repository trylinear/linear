define(function (require) {

    'use strict';

    var MessageView = require('./message');

    var MessageModel = require('../models/message');

    return MessageView.extend({

        handleSaveMessage: function (e) {

            var model = new MessageModel();

            model.url = this.parentPost.model.url() + '/messages/';

            e.preventDefault();

            model.save({
                contents: this.$el.find('.markdown-contents').val()
            }).done(function () {

                this.parentPost.subview.collection.add(model);

                this.$el.find('.markdown-contents').val('');

            }.bind(this));

        }

    });

});
