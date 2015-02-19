module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        jshint: {

            server: {
                options: {
                    jshintrc: true
                },
                src: ['src/**/*.js']
            }

        },

        sass: {

            dist: {

                files: {
                    'static/css/styles.css': 'static/css/styles.scss'
                }

            }

        },

        watch: {

            jshint: {
                files: ['src/**/*.js'],
                tasks: ['jshint']
            },

            sass: {
                files: ['static/css/**/*.scss'],
                tasks: ['sass']
            }

        }

    });

    grunt.registerTask('default', [ 'jshint', 'sass' ]);

};
