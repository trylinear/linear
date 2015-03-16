var log = {
    info: console.info,
    notice: console.log,
    warning: console.warn,
    err: console.error
};

if (process.env.LOGENTRIES_TOKEN) {

    log = require('le_node').logger({
        token: process.env.LOGENTRIES_TOKEN
    });

    log.on('log', function (err) {

        console.log(err);

    });

}

module.exports = log;
