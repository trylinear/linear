define(function (require) {

    'use strict';

    var Marionette = require('marionette');

    var MessageView = require('views/message');

    return Marionette.CollectionView.extend({

        childView: MessageView

    });

});
