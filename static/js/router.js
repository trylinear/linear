define(function (require) {

    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        ProfileModel = require('./models/profile'),
        PostModel = require('./models/post'),
        PostView = require('./views/post');

    var Router = Backbone.Router.extend({

        routes: {
            'post/new/': null,
            'post/(:name/):id/': 'post'
        },

        post: function (postName, postId) {

            var profile = new ProfileModel(),
                model = new PostModel({ id: postId }),
                view = new PostView({ model: model });

            $.when(
                profile.fetch(),
                model.fetch()
            ).done(view.render);

        }

    });

    var App = new Router();

    Backbone.history.start({ pushState: true });

    return App;

});
