define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        PostView = require('views/post'),
        PostModel = require('models/post');

    var Router = Backbone.Router.extend({

        routes: {
            'post/new/': 'pass',
            'post/(:name/):id/': 'post'
        },

        post: function (postName, postId) {

            var model = new PostModel({ id: postId }),
                view = new PostView({ model: model });

            model.fetch().done(view.render);

        }

    });

    var App = new Router();

    Backbone.history.start({ pushState: true });

    return App;

});
