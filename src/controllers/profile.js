var profileModel = require('../models/profile');

module.exports = {

    show: function (profileId) {

        return profileModel.showProfileById(profileId);

    }

};
