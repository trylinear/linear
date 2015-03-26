var notificationModel = require('../models/notification');

module.exports = {

    list: function (profileId) {

        return notificationModel.listUnread(profileId);

    }

};
