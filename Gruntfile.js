var fs = require("fs")
var path = require("path")

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
      },
      dist: {
        files: {
          'build/octicons.css': 'index.scss'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({ browsers: '> 5%' })
        ]
      },
      build: {
        src: 'build/**/*.*css'
      }
    },

    cssnano: {
      options: {
      },
      dist: {
        files: {
          'build/octicons.min.css': 'build/octicons.css'
        }
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
          cwd: 'lib/svg',
          src: ['*.svg'],
          dest: 'build/svg'
        }]
      }
    },

    svg_sprite: {
      octicons: {
        expand: true,
        cwd: 'lib/svg',
        src: ['*.svg'],
        dest: 'build/',
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

    clean: {
      svg: [
        'build/svg/*',
        'build/sprite.octicons.svg',
        'build/octicons.*'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-cssnano');
  grunt.loadNpmTasks('grunt-sass');

  // build tasks
  grunt.registerTask('css',  ['sass', 'postcss', 'cssnano']);
  grunt.registerTask('svg', ['clean:svg', 'svgmin', 'svg_sprite']);

  // default task, build /dist/
  grunt.registerTask('default', [ 'svg', 'css', 'svg_json']);

  grunt.registerTask('svg_json', 'create a json object with all minimized svg', function() {
    var result = {}
    var files = fs.readdirSync("./build/svg/")

    files.forEach(function(file) {
      var svg = fs.readFileSync(path.resolve("./build/svg", file))
      var key = path.basename(file, ".svg")
      result[key] = svg.toString()
    })

    fs.writeFileSync("build/svg.json", JSON.stringify(result));
  })
};
