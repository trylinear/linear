var q = require('q');

var profileModel = require('../models/profile');

module.exports = {

    update: function (data, profileId) {

        var deferred = new q.defer();

        profileModel.updateProfile(profileId, data, function (err, profile) {

            if (err || !profile) { deferred.reject(err); }
            else { deferred.resolve(profile); }

        });

        return deferred.promise;

    }

};
