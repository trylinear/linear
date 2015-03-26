module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        jshint: {

            server: {
                options: {
                    jshintrc: true
                },
                src: ['src/**/*.js']
            },

            tests: {
                options: {
                    jshintrc: true
                },
                src: ['test/**/*.js']
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
                files: ['src/**/*.js', 'test/**/*.js'],
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
