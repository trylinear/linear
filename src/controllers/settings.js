var profileModel = require('../models/profile');

module.exports = {

    render: function (req, res, next) {

        if (req.body.locale) {

            profileModel.findByIdAndUpdate(req.user.id, { updated: Date.now(), locale: req.body.locale }).
                exec(function (err, profile) {

                    if (err) { return next(err); }

                    res.redirect('/settings/');

                });

        } else {

            res.render('settings', {
                title: req.__('Settings')
            });

        }

    }

};
