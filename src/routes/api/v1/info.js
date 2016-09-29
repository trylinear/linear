const config = require('../../../../config.json');
const pkg = require('../../../../package.json');

module.exports = router => {

    router.get('/', (req, res) => {

        res.json({
            'site_name': config.site_name,
            'version': pkg.version
        });

    });

};
