module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

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
