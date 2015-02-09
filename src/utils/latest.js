var later = require('later');
var latestVersion = require('latest-version');

var pkg = require('../../package.json');

var latest;

var schedule = later.setInterval(function () {

    latestVersion('linear', function (err, version) {

        if (version !== pkg.version) {

            latest = version;

            schedule.clear();

        }

    });

}, later.parse.text('every 1 day'));

module.exports = function () {

    return latest;

};
