var search = require('../controllers/search');

module.exports = function (router) {

    router.get('/', function (req, res, next) {

        search.show(req.query.q).then(function (results) {

            res.render('search', {
                title: req.__('Search'),
                query: req.query.q,
                results: results
            });

        }).catch(next);

    });

};
