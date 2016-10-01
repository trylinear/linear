const profileModel = require('../models/profile');

module.exports = {

    create (type, data) {

        return profileModel.createProfile(type, data);

    },

    show (profileId) {

        return profileModel.showProfileById(profileId);

    },

    update (profileId, data) {

        return profileModel.updateProfileById(profileId, data);

    }

};
