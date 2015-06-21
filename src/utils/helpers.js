var markdown = require('markdown-it')({
    html: true,
    linkify: true
});

markdown.use(require('markdown-it-emoji'));

var sanitizeHtml = require('sanitize-html');

var moment = require('moment');
var numeral = require('numeral');

module.exports = function (Handlebars) {

    Handlebars.registerHelper('displayNumber', function (num) {

        return numeral(num).format('0,0a');

    });

    Handlebars.registerHelper('ifCond', function (a, b, options) {

        return a === b ? options.fn(this) : options.inverse(this);

    });

    Handlebars.registerHelper('limitOutput', function (value, limit) {

        value = markdown.render(value).replace(/<.+?>/g, '');

        if (value.length > limit) {

            value = value.substring(0, limit);
            value = value.substring(0, value.lastIndexOf(' ')) + ' …';

        }

        return value;

    });

    Handlebars.registerHelper('markdown', function (value) {

        return sanitizeHtml(markdown.render(value), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        });

    });

    Handlebars.registerHelper('relativeTime', function (date) {

        return moment(date).fromNow();

    });

    Handlebars.registerHelper('titleCase', function (value) {

        return value.replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });

    });

};
