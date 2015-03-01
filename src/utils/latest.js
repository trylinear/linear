var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({ store: 'memory', max: 100, ttl: 60 * 60 * 12 });

var latestVersion = require('latest-version');

var pkg = require('../../package.json');

var latest;

module.exports = function () {

    memoryCache.get('package-version', function (err, version) {

        if (!version) {

            latestVersion('linear', function (err, version) {

                memoryCache.set('package-version', version);

                if (version !== pkg.version) {

                    latest = version;

                }

            });

        }

    });

    return latest;

};
