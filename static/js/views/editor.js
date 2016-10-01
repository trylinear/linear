const Marionette = require('backbone.marionette');
const Handlebars = require('handlebars');

require('../../templates/helpers');
require('../../templates/partials');
require('../../templates/views');

const markdown = require('markdown-it')();

markdown.use(require('markdown-it-emoji'));

module.exports = Marionette.View.extend({

    'events': {
        'click a[href="#markdown-toggle"]': 'handleMarkdownToggle'
    },

    handleMarkdownToggle (e) {

        e.preventDefault();

        const $markdownContents = this.$el.find('.markdown-contents');
        const $markdownPreview = this.$el.find('.markdown-preview');

        $markdownPreview.html(markdown.render($markdownContents.val()));

        $markdownContents.toggle();
        $markdownPreview.toggle();

    },

    reset () {

        this.render();

    },

    'template': Handlebars.partials.markdown_editor,

    value () {

        return this.$el.find('.markdown-contents').val();

    }

});
