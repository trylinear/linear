const MessageView = require('./message');

const MessageModel = require('../models/message');

module.exports = MessageView.extend({

    handleSaveMessage (e) {

        const model = new MessageModel();

        model.url = `${this.parentPost.model.url()}/messages/`;

        e.preventDefault();

        model.save({
            'contents': this.$el.find('.markdown-contents').val()
        }).done(data => {

            model.url = `${this.parentPost.model.url()}/messages/${data._id}`;

            this.parentPost.subview.collection.add(model);

            this.editor.reset();

        });

    }

});
