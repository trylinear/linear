const markdown = require('markdown-it')({
    'html': true,
    'linkify': true
});

markdown.use(require('markdown-it-emoji'));

const sanitizeHtml = require('sanitize-html');

const moment = require('moment');
const numeral = require('numeral');

module.exports = Handlebars => {

    Handlebars.registerHelper('displayNumber', num => numeral(num).format('0,0a'));

    Handlebars.registerHelper('ifCond', function (a, b, options) {

        return a === b ? options.fn(this) : options.inverse(this);

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

            return sanitizeHtml(markdown.render(value), {
                'allowedTags': sanitizeHtml.defaults.allowedTags.concat(['img'])
            });

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

};
