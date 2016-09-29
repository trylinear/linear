const profileModel = require('../models/profile');

module.exports = {

    update (data, profileId) {

        return profileModel.updateProfileById(profileId, data);

    }

};
