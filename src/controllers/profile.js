var profileModel = require('../models/profile');

module.exports = {

    create: function (type, data) {

        return profileModel.createProfile(type, data);

    },

    show: function (profileId) {

        return profileModel.showProfileById(profileId);

    }

};
