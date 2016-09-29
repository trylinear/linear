module.exports = router => {

    router.get('*', (req, res, next) => {

        res.header('X-Linear-Media-Type', 'linear.v1');

        next();

    });

};
