module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

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
      },
      site: {
        files: [
          {
            expand: true,
            src: ['dist/font/*'],
            dest: 'docs/components/octicons/',
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
    },

    jekyll: {
      options: {
        bundleExec: true,
        src: 'docs/',
        config: '_config.yml',
        raw: 'version: v<%= pkg.version %>\n'+
             'name: <%= pkg.name %>\n' +
             'description: <%= pkg.description %>',
        watch: false
      },
      serve: {
        options: {
          serve: true,
          dest: '_site',
          drafts: true
        }
      }
    },

    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:github/octicons.git',
          branch: 'gh-pages'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-webfont');

  grunt.registerTask('serve', ['copy:site', 'jekyll:serve']);

  grunt.registerTask('default', ['clean', 'svg_sprite', 'webfont', 'copy:octicons']);
};
