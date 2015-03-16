var profileModel = require('../models/profile');

module.exports = {

    update: function (data, profileId) {

        return profileModel.updateProfile(profileId, data);

    }

};
