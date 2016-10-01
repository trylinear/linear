const Marionette = require('backbone.marionette');

const EditorView = require('./editor');

module.exports = Marionette.View.extend({

    'el': '.page-content .inner-wrapper',

    'initialize': function () {

        this.editor = new EditorView();
        this.editor.setElement(this.$el.find('.markdown-editor'));
        this.editor.delegateEvents();

    }

});
