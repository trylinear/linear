define(function (require) {

    'use strict';

    var Marionette = require('marionette');

    var EditorView = require('./editor');

    return Marionette.ItemView.extend({

        el: '.page-content .inner-wrapper',

        initialize: function () {

            this.editor = new EditorView();
            this.editor.setElement(this.$el.find('.markdown-editor'));
            this.editor.delegateEvents();

        }

    });

});
