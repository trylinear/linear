var search = require('../../../controllers/search');

module.exports = function (router) {

    router.get('/', function (req, res) {

        search.show(req.query.q).then(function (results) {

            res.json(results);

        }).catch(function (err) {

            res.status(err.status);
            res.json({ status: err.status, message: err.message });

        });

    });

};
