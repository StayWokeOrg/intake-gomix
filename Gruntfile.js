/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function config(grunt) {
  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      site: ['public/css/styles.css'],
    },

    less: {
      site: {
        src: ['public/less/styles.less'],
        dest: 'public/css/styles.css',
      },
    },
  })

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-less')

  grunt.registerTask('build', ['clean', 'less'])

  // Default task.
  grunt.registerTask('default', ['build'])
}
