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

Handlebars.registerHelper('__', key => locales[key] || key);

Handlebars.registerHelper('displayNumber', num => numeral(num).format('0,0a'));

Handlebars.registerHelper('ifCond', function (a, b, options) {

    return a === b ? options.fn(this) : options.inverse(this);

});

Handlebars.registerHelper('limitOutput', (value, limit) => {

    let newValue = markdown.render(value).replace(/<.+?>/g, '');

    if (newValue.length > limit) {

        newValue = newValue.substring(0, limit);
        newValue = `${newValue.substring(0, newValue.lastIndexOf(' '))} …`;

    }

    return value;

});

Handlebars.registerHelper('markdown', value => {

    if (value) {

        return markdown.render(value);

    }

    return null;

});

Handlebars.registerHelper('relativeTime', date => moment(date).fromNow());

Handlebars.registerHelper('titleCase', value =>
    value.replace(/\b\w/g, letter => letter.toUpperCase()));
