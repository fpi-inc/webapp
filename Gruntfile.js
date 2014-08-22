//Gruntfile
module.exports = function(grunt){
    //grunt
    grunt.initConfig({

        //Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
        ' * @name: <%= pkg.name %> \n' +
        ' * @version: v<%= pkg.version %>\n' +
        ' * @company: fpi-inc \n' +
        ' * @author: <%= pkg.author %> \n' +
        ' */\n',
        less: {
            development: {
                options: {
                    path: ["app/dist/css"]
                },
                files: {
                    "app/dist/css/<%= pkg.name %>.css": "src/less/main.less"
                }
            }
        },

        watch: {
            src: {
                files: ["src/less/**/*.less", "src/js/**/*.js"],
                tasks: ["build"]
            }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: "<%= banner %>\n"
                },
                files: {
                    src: [ 'app/dist/css/**/*.css', 'app/dist/js/**/*.js']
                }
            }
        },

        copy: {
            css: {
                files: [
                	{ expand: true, cwd: "src/less/css", src: ["*"], dest: "app/dist/css/" }//,
                	//{ expand: true, cwd: "font/Font-Awesome-3.2.1/css", src: ["*"], dest: "dist/font/" },
                    //{ expand: true, cwd: "font/Font-Awesome-3.2.1/font", src: ["*"], dest: "dist/font/" }
                ]
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: "<%= banner %>\n"
                },
                files: {
                    //'path/to/output.css': ['path/to/**/*.css']
                    'app/dist/css/<%= pkg.name %>.min.css': ['app/dist/css/<%= pkg.name %>.css']
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: ("publish/renovation-<%= pkg.version %>.zip")
                },
                files: [
                    { expand: true, cwd: "", src: ["dist/css/Renovation.min.css", "dist/font/**/*", "!dist/font/font-awesome.css", "!dist/font/font-awesome-ie7.css"], dest: "" },
                    { expand: true, cwd: "", src: ["html/**/*", "images/**/*"], dest: "" }
                ]
            }
        },

        concat: {
            dist: {
                options: {
                    separator: "\n\n"
                },
                src: [
                    "src/js/app.js",
                    "src/js/directive/menu.js",
                    "src/js/home/HomeController.js",
                    "src/js/CategoryService.js"
                ],
                dest: "app/dist/js/<%= pkg.name %>.js"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-banner");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.registerTask('default', ['less:development', 'concat', 'usebanner', 'cssmin']);
    //grunt.registerTask('default', ['less:development', 'usebanner', 'copy', 'cssmin']);
    grunt.registerTask('build', ['less:development', 'concat']);
    //grunt.registerTask('publish', ['compress']);
}