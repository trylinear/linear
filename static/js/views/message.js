/* eslint no-alert: 0 */

const Marionette = require('backbone.marionette');
const Handlebars = require('handlebars');

require('../../templates/helpers');
require('../../templates/partials');
require('../../templates/views');

const EditorView = require('./editor');

const FADE_OUT_DURATION = 200;
const KEY_CODE_ENTER_KEY = 13;

window.Handlebars = Handlebars;

module.exports = Marionette.View.extend({

    'events': {
        'click a[href="#cancel-edit"]': 'handleCancelEditMessage',
        'click a[href="#delete"]': 'handleDeleteMessage',
        'click a[href="#edit"]': 'handleEditMessage',
        'keydown textarea[name="contents"]': 'handleKeyDownEvent',
        'submit form': 'handleSaveMessage'
    },

    initialize (config) {

        this.editor = new EditorView();
        this.setupEditor();

        this.config = config;

        if (!this.config.templates) {

            this.config.templates = {
                'edit': Handlebars.partials.post_message_form,
                'view': Handlebars.partials.post_message
            };

        }

        this.template = this.config.templates.view;

    },

    render () {

        this.$el.html(this.template(
            Object.assign({}, this.model.toJSON(), {
                'editable': this.model.get('createdBy')._id === sessionStorage.getItem('profileId')
            })
        ));

        this.setupEditor();

    },

    setupEditor () {

        this.editor.setElement(this.$el.find('.markdown-editor'));
        this.editor.delegateEvents();

    },

    remove () {

        this.$el.fadeOut(FADE_OUT_DURATION, () => {

            this.$el.remove();

        });

    },

    handleKeyDownEvent (e) {

        if (e.metaKey && e.keyCode === KEY_CODE_ENTER_KEY) {

            e.preventDefault();

            this.handleSaveMessage(e);

            return false;

        }

        return true;

    },

    handleEditMessage (e) {

        e.preventDefault();

        this.template = this.config.templates.edit;

        this.render();

    },

    handleCancelEditMessage (e) {

        e.preventDefault();

        this.template = this.config.templates.view;

        this.render();

    },

    handleDeleteMessage (e) {

        e.preventDefault();

        if (window.confirm('Are you sure you want to delete this message?')) {

            this.model.destroy();

        }

    },

    handleSaveMessage (e) {

        e.preventDefault();

        const formInputs = this.$el.find('input:visible, textarea:visible');

        this.model.set(formInputs.serializeArray().reduce((prev, curr) => {

            prev[curr.name] = curr.value;

            return prev;

        }, {}));

        this.template = this.config.templates.view;

        this.model.save().done(this.render);

    }

});
