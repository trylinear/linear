const Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    initialize () {

        this.on('sync', () => {

            sessionStorage.setItem('profileId', this.get('_id'));

        });

        this.on('error', () => {

            sessionStorage.removeItem('profileId');

        });

    },

    'urlRoot': '/api/v1/profiles/auth'

});
