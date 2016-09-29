module.exports = {

    requireLogin (req, res, next) {

        if (!req.user) {

            return next({
                'message': 'Login Required',
                'status': 401
            });

        }

        next();

        return false;

    }

};
