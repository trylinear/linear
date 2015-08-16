define(function (require) {

    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        PostView = require('views/post'),
        PostModel = require('models/post');

    var Router = Backbone.Router.extend({

        routes: {
            'post/new/': null,
            'post/(:name/):id/': 'post'
        },

        post: function (postName, postId) {

            var model = new PostModel({ id: postId }),
                view = new PostView({ model: model });

            $.when(
                model.fetch()
            ).done(view.render);

        }

    });

    var App = new Router();

    Backbone.history.start({ pushState: true });

    return App;

});
