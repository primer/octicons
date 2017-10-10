var fs = require("fs")
var path = require("path")

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    svgstore: {
      options: {
        includeTitleElement: false,
        inheritviewbox: true,
        includedemo: function(arg) {
          var octicons = require("./index.js")

          var icons = function() {
            var result = []
            Object.keys(octicons).forEach(function(key){
              result.push("<div style=\"width: 10%;min-width: 100px;flex: 0 0 auto;box-sizing:border-box;padding:1em;text-align:center;\">" + octicons[key].toSVGUse({ height: 32 }) + "<div>" + key + "</div></div>")
            })
            return result.join("\n")
          }

          return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Octicons Spritesheet test</title>
    <link rel="stylesheet" href="./octicons.css" media="screen" title="no title">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #222;
        font-size: 15px;
      }
    </style>
  </head>
  <body>
    ${arg.svg}
    <div style="font-size: 2.2em;padding-left: 20px;">Octicons SVG Spritesheet demo</div>
    <div style="font-size: 1.2em;margin: 1em 0;padding-left: 20px;">All the icons rendered below use the svg spriteheet located in the <code>/build/</code> directory.</div>
    <div style="flex: 0 1 auto;display:flex;flex-wrap: wrap;    flex-direction: row;">
      ${icons()}
    </div>
  </body>
</html>
`
        }
      },
      default: {
        files: {
          "build/sprite.octicons.svg": ['build/svg/*.svg']
        }
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svgstore');

  // build tasks
  grunt.registerTask('css',  ['copy', 'cssnano']);

  // default task, build /dist/
  grunt.registerTask('default', [ 'css', 'svgstore']);

};
