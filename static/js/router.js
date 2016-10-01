const $ = require('jquery');
const Backbone = require('backbone');
const ProfileModel = require('./models/profile');
const PostModel = require('./models/post');
const PostCreateView = require('./views/post-create');
const PostView = require('./views/post');

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
        ).done(function () {

        });

    }

});

var App = new Router();

Backbone.history.start({ pushState: true });

module.exports = App;
