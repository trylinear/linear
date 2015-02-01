module.exports = {

    requireLogin: function (req, res, next) {

        if (!req.user) {

            return next({ status: 401, message: 'Login Required' });

        }

        next();

    }

};
