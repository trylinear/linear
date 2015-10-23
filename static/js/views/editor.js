define(function (require) {

    'use strict';

    var _ = require('underscore');

    var Marionette = require('marionette'),
        Handlebars = require('handlebars'),
        templates = require('templates');

    var markdown = require('markdown-it')();

    markdown.use(require('markdown-it-emoji'));

    templates.partials = Handlebars.partials;

    return Marionette.ItemView.extend({

        events: {
            'click a[href="#markdown-toggle"]': 'handleMarkdownToggle'
        },

        template: templates.partials.markdown_editor,

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

});
