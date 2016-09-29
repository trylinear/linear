const searchController = require('../controllers/search');

module.exports = router => {

    router.get('/', (req, res, next) => {

        searchController.show(req.query.q).then(results => {

            res.render('search', {
                'page_title': req.__('Search'),
                'query': req.query.q,
                results,
                'style': 'search'
            });

        })
        .catch(next);

    });

};
