/* eslint no-console: 0 */

const Logger = require('le_node');

let log = {
    'err': console.error,
    'info': console.info,
    'notice': console.log,
    'warning': console.warn
};

if (process.env.LOGENTRIES_TOKEN) {

    log = new Logger({
        'token': process.env.LOGENTRIES_TOKEN
    });

    log.on('log', err => {

        console.log(err);

    });

}

module.exports = log;
