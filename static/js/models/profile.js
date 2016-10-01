const Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    'initialize': function () {

        this.on('sync', function () {

            sessionStorage.setItem('profileId', this.get('_id'));

        }.bind(this));

    },

    'urlRoot': '/api/v1/profiles/auth'

});
