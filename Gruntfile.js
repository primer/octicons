module.exports = function(grunt) {

  grunt.initConfig({

    svg_sprite: {
      octicons: {
        expand      : true,
        cwd         : 'src/svg',
        src         : ['*.svg'],
        dest        : 'dist/svg',
        options     : {
          mode      : {
            symbol  : {
              dest  : "",
              sprite: "sprite.octicons.svg"
            }
          }
        }
      }
    },


    webfont: {
      options: {
        font: "octicons",
        types: 'eot,woff,ttf,svg',
        htmlDemo: false,
        templateOptions: {
            baseClass: 'octicon',
            classPrefix: 'octicon-',
            mixinPrefix: 'octicon-'
        }
      },
      octicons_css: {
        src: 'src/svg/*.svg',
        dest: 'dist/font',
        options: {
          template: 'src/styles/font-template.css'
        }
      },
      octicons_scss: {
        src: 'src/svg/*.svg',
        dest: 'dist/font',
        options: {
          stylesheet: 'scss',
          template: 'src/styles/font-template.scss'
        }
      },
      octicons_less: {
        src: 'src/svg/*.svg',
        dest: 'dist/font',
        options: {
          stylesheet: 'less',
          template: 'src/styles/font-template.less'
        }
      }
    },

    copy: {
      octicons: {
        files: [
          {
            expand: true,
            src: ['src/svg/*'],
            dest: 'dist/svg/icons/',
            filter: "isFile",
            flatten: true
          }
        ]
      }
    },

    clean: {
      fonts: ['dist/font/*'],
      icons: ['dist/svg/icons/*'],
      sprite: ['dist/svg/sprite.octicons.svg'],
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-webfont');

  grunt.registerTask('default', ['clean', 'svg_sprite', 'webfont', 'copy']);
};
