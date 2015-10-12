define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        urlRoot: '/api/v1/profiles/auth',

        initialize: function () {

            this.on('sync', function () {

                sessionStorage.setItem('profileId', this.get('_id'));

            }.bind(this));

        }

    });

});
