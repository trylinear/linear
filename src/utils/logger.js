require('with-env')();

var log = {
    info: console.info,
    notice: console.log,
    warning: console.warn,
    err: console.error
};

if (process.env.LOGENTRIES_TOKEN) {

    var Logger = require('le_node');

    log = new Logger({
        token: process.env.LOGENTRIES_TOKEN
    });

    log.on('log', function (err) {

        console.log(err);

    });

}

module.exports = log;
