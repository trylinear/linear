require.config({
    'paths': {
        'backbone': '../../bower_components/backbone/backbone-min',
        'handlebars': '../../bower_components/handlebars/handlebars.min',
        'handlebars.helpers': '../../templates/helpers',
        'jquery': '../../bower_components/jquery/dist/jquery.min',
        'markdown-it': '../../bower_components/markdown-it/dist/markdown-it',
        'markdown-it-emoji': '../../bower_components/markdown-it-emoji/dist/markdown-it-emoji',
        'marionette': '../../bower_components/marionette/lib/backbone.marionette.min',
        'moment': '../../bower_components/moment/moment',
        'numeral': '../../bower_components/numeraljs/numeral',
        'templates': '../../templates/compiled',
        'text': '../../bower_components/requirejs-text/text',
        'underscore': '../../bower_components/underscore/underscore-min'
    }
});

define(['router']);
