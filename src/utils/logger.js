var logentries = require('le_node');

var log = console;

if (process.env.LOGENTRIES_TOKEN) {

    log = logentries.logger({
        token: process.env.LOGENTRIES_TOKEN
    });

}

module.exports = log;
