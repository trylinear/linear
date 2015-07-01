define(function (require) {

    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        PostView = require('views/post'),
        ProfileModel = require('models/profile'),
        PostModel = require('models/post');

    var profile = new ProfileModel({ id: 'auth' });

    var Router = Backbone.Router.extend({

        routes: {
            'post/new/': 'pass',
            'post/(:name/):id/': 'post'
        },

        post: function (postName, postId) {

            var model = new PostModel({ id: postId }),
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
