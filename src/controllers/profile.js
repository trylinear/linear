var q = require('q');

var profileModel = require('../models/profile');

module.exports = {

    show: function (profileId) {

        var deferred = new q.defer();

        profileModel.showProfileById(profileId, function (err, profile) {

            if (err || !profile) { deferred.reject(err); }
            else { deferred.resolve(profile); }

        });

        return deferred.promise;

    }

};
