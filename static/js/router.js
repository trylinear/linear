const $ = require('jquery');
const Backbone = require('backbone');
const ProfileModel = require('./models/profile');
const PostModel = require('./models/post');
const PostCreateView = require('./views/post-create');
const PostView = require('./views/post');

const Router = Backbone.Router.extend({

    postCreate () {

        const view = new PostCreateView();

    },

    postEdit (postName, postId) {

        const profile = new ProfileModel();
        const model = new PostModel({
            'id': postId
        });

        const view = new PostView({
            model
        });

        $.when(
            profile.fetch(),
            model.fetch()
        ).done(() => {

        });

    },

    'routes': {
        'post/(:name/):id/': 'postEdit',
        'post/new/': 'postCreate'
    }

});

const App = new Router();

Backbone.history.start({
    'pushState': true
});

module.exports = App;
