/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* http://PROJECT_WEBSITE/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'YOUR_NAME; Licensed MIT */\n',
    // Task configuration.
	depconcat: {
		js: {
			src: ['src/*.js'],
			dest: 'dist/all.js'
		},
	    css: {
			src: ['assets/*.css'],
			dest: 'dist/all.css'
		}
	},
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= depconcat.js.dest %>',
        dest: 'dist/all.min.js'
      }
    },
	cssmin: {
		options: {
			report: 'min'
		},
		dist: {
			files: {
				'dist/all.min.css' : '<%= depconcat.css.dest %>'
			}
		}
	},
	watch: {
		js: {
			files: ['<%= depconcat.js.src %>'],
			tasks: ['depconcat:js']
		},
	    css: {
			files: ['<%= depconcat.css.src %>'],
			tasks: ['depconcat:css']
		}
	}
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-depconcat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['depconcat', 'uglify', 'cssmin']);
  grunt.registerTask('dev', ['depconcat', 'watch']);

};
