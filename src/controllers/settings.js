const profileModel = require('../models/profile');

module.exports = {

    update (profileId, data) {

        return profileModel.updateProfileById(profileId, data);

    }

};
