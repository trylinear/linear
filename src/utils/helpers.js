var markdown = require('markdown-it')({
    linkify: true
});

var emoji = require('markdown-it-emoji');
markdown.use(emoji);

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

        if (value.length > limit) {

            value = value.substring(0, limit);
            value = value.substring(0, value.lastIndexOf(' ')) + ' …';

        }

        return value;

    });

    Handlebars.registerHelper('markdown', function (value) {

        return markdown.render(value);

    });

    Handlebars.registerHelper('relativeTime', function (date) {

        return moment(date).fromNow();

    });

    Handlebars.registerHelper('titleCase', function (value) {

        return value.replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });

    });

};
