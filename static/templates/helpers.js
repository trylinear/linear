const Handlebars = require('handlebars');

const markdown = require('markdown-it')({
    'html': true,
    'linkify': true
});

markdown.use(require('markdown-it-emoji'));

const moment = require('moment');
const numeral = require('numeral');

let locales = {};

fetch('/api/v1/locales')
    .then(response => response.json())
    .then(json => {

        locales = json;

    });

Handlebars.registerHelper('__', function (key) {

    return locales[key] || key;

});

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

    if (value) {

        return markdown.render(value);

    }

});

Handlebars.registerHelper('relativeTime', function (date) {

    return moment(date).fromNow();

});

Handlebars.registerHelper('titleCase', function (value) {

    return value.replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });

});
