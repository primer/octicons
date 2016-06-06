module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    postcss: {
      options: {
        map: {
          inline: false
        },
        processors: []
      },
      dist: {
        src: 'dist/**/*.css'
      }
    },

    svgmin: {
      dist: {
        options: {
          plugins: [
            {removeTitle: true},
            {removeStyleElement: true},
            {removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'] }},
            {removeEmptyContainers: true},
            {sortAttrs: true},
            {removeUselessDefs: true},
            {removeEmptyText: true},
            {removeEditorsNSData: true},
            {removeEmptyAttrs: true},
            {removeHiddenElems: true}
          ]
        },
        files: [{
          expand: true,
          cwd: 'src/svg',
          src: ['*.svg'],
          dest: 'dist/svg/icons'
        }]
      }
    },

    svg_sprite: {
      octicons: {
        expand: true,
        cwd: 'src/svg',
        src: ['*.svg'],
        dest: 'dist/svg',
        options: {
          mode: {
            symbol: {
              dest: "",
              sprite: "sprite.octicons.svg"
            }
          }
        }
      }
    },

    webfont: {
      options: {
        font: "octicons",
        fontFamilyName: "Octicons",
        types: 'eot,woff,woff2,ttf,svg',
        fontHeight: 96,
        normalize: false,
        ascent: 84,
        descent: 12,
        htmlDemo: false,
        codepointsFile: 'src/codepoints.json',
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
      svg: {
        files: [
          {
            expand: true,
            src: ['src/styles/_svg-octicons.scss', 'src/styles/octicons.css'],
            dest: 'dist/svg/',
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
      font: [
        'dist/font/*'
      ],
      svg: [
        'dist/svg/icons/*',
        'dist/svg/sprite.octicons.svg',
        'dist/svg/_svg-octicons.*'
      ]
    },

    cssmin: {
      font: {
        files: [{
          expand: true,
          cwd: 'dist/font',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/font',
          ext: '.min.css'
        }]
      },
      svg: {
        files: [{
          expand: true,
          cwd: 'dist/svg',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/svg',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // build tasks
  grunt.registerTask('font', ['clean:font', 'webfont']);
  grunt.registerTask('svg', ['clean:svg', 'svgmin', 'svg_sprite', 'copy:svg']);

  // default task, build /dist/
  grunt.registerTask('default', [ 'svg', 'font', 'postcss', 'cssmin']);
};
