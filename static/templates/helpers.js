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

Handlebars.registerHelper('ifCond', function ifCond (a, b, options) {

    if (a === b) {

        return options.fn(this);

    }

    return options.inverse(this);

});

Handlebars.registerHelper('limitOutput', (value, limit) => {

    if (value) {

        let modifiedValue = markdown.render(value).replace(/<.+?>/g, '');

        if (value.length > limit) {

            modifiedValue = modifiedValue.substring(0, limit);
            modifiedValue = `${modifiedValue.substring(0, modifiedValue.lastIndexOf(' '))} …`;

        }

        return modifiedValue;

    }

    return value;

});

Handlebars.registerHelper('markdown', value => {

    if (value) {

        return markdown.render(value);

    }

    return false;

});

Handlebars.registerHelper('relativeTime', date => moment(date).fromNow());

Handlebars.registerHelper('titleCase', value => {

    if (value) {

        return value.replace(/\b\w/g, letter => letter.toUpperCase());

    }

    return false;

});
