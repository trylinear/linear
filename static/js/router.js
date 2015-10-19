define(function (require) {

    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        ProfileModel = require('./models/profile'),
        PostModel = require('./models/post'),
        PostCreateView = require('./views/post-create'),
        PostView = require('./views/post');

    var Router = Backbone.Router.extend({

        routes: {
            'post/new/': 'postCreate',
            'post/(:name/):id/': 'postEdit'
        },

        postCreate: function (postName, postId) {

            var view = new PostCreateView();

        },

        postEdit: function (postName, postId) {

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
