const searchController = require('../../../controllers/search');

module.exports = router => {

    router.get('/', (req, res) => {

        searchController.show(req.query.q).then(results => {

            res.json(results);

        })
        .catch(err => {

            res.status(err.status);
            res.json({
                'message': err.message,
                'status': err.status
            });

        });

    });

};
