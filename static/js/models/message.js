define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        initialize: function (options) {

            if (options) {

                if (options.url) {

                    this.url = options.url;

                }

            }

        }

    });

});
