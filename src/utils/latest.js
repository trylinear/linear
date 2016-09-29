const cacheManager = require('cache-manager');
const memoryCache = cacheManager.caching({
    'max': 100,
    'store': 'memory',
    'ttl': 43200
});

const latestVersion = require('latest-version');

const logger = require('./logger');

const pkg = require('../../package.json');

module.exports = () => {

    let version = null;

    memoryCache.get('package-version', (err, cachedVersion) => {

        if (!cachedVersion) {

            logger.info('Checking for new version of linear.');

            latestVersion('linear').then(currentVersion => {

                memoryCache.set('package-version', currentVersion);

                if (currentVersion !== pkg.version) {

                    logger.info(`New version (${currentVersion}) found!`);

                    version = currentVersion;

                }

            });

        } else if (err) {

            throw new Error(err);

        }

    });

    return version;

};
