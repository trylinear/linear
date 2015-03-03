module.exports = function (router) {

    router.get('*', function (req, res, next) {

        res.header('X-Linear-Media-Type', 'linear.v1');

        next();

    });

};
