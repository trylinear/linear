const Marionette = require('backbone.marionette');
const Handlebars = require('handlebars');

require('../../templates/helpers');
require('../../templates/partials');
require('../../templates/views');

const markdown = require('markdown-it')();

markdown.use(require('markdown-it-emoji'));

module.exports = Marionette.View.extend({

    events: {
        'click a[href="#markdown-toggle"]': 'handleMarkdownToggle'
    },

    template: Handlebars.partials.markdown_editor,

    handleMarkdownToggle: function (e) {

        e.preventDefault();

        var $markdownContents = this.$el.find('.markdown-contents'),
            $markdownPreview = this.$el.find('.markdown-preview');

        $markdownPreview.html(markdown.render($markdownContents.val()));

        $markdownContents.toggle();
        $markdownPreview.toggle();

    },

    reset: function () {

        this.render();

    },

    value: function () {

        return this.$el.find('.markdown-contents').val();

    }

});
