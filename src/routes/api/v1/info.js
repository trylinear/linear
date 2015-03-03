var config = require('../../../../config.json');
var pkg = require('../../../../package.json');

module.exports = function (router) {

    router.get('/', function (req, res) {

        res.json({
            site_name: config.site_name,
            version: pkg.version
        });

    });

};
