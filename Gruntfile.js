var fs = require("fs")
var path = require("path")

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    cssnano: {
      options: {},
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
      build: [
        'build/*'
      ]
    },

    copy: {
      css: {
        src: "lib/octicons.css",
        dest: "build/octicons.css"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-cssnano');

  // build tasks
  grunt.registerTask('css',  ['copy', 'cssnano']);
  grunt.registerTask('svg', ['clean', 'svgmin', 'svg_sprite']);

  // default task, build /dist/
  grunt.registerTask('default', [ 'svg', 'css', 'json:svg']);

  grunt.registerTask('json:svg', 'add svg string to data.json build', function() {
    var files = fs.readdirSync("./build/svg/")
    var data = JSON.parse(fs.readFileSync("./lib/data.json"))

    files.forEach(function(file) {
      var svg = fs.readFileSync(path.resolve("./build/svg", file))
      var key = path.basename(file, ".svg")
      if (data[key]) {
        var raw = svg.toString()
        data[key].path = /<path.+\/>/g.exec(raw)[0]
        data[key].height = /height="(\d+)"/g.exec(raw)[1]
        data[key].width = /width="(\d+)"/g.exec(raw)[1]
      }
    })

    fs.writeFileSync("build/data.json", JSON.stringify(data));
  })
};
