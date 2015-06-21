define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    var MessageModel = require('models/message');

    return Backbone.Collection.extend({

        model: MessageModel

    });

});
