var data = require('./build/data.json')

Object.keys(data).forEach(function(key) {

  var closestSize = function(reqSize) {
    var sizes = Object.keys(data[key].svg).sort(function(a, b) { return a - b }).reverse()
    var result = "16"

    if(reqSize) {
      for(var i = 0; i < sizes.length; i++) {
        var size = sizes[i];
        if(parseInt(size) <= reqSize) {
          result = size
          break;
        }
      }
    }

    return result
  }

  // Returns a string representation of html attributes
  var htmlAttributes = function(icon, options) {
    var attributes = []
    var attrObj = Object.assign({}, data[key].options, options)

    attrObj["width"] = data[key].svg["16"].width
    attrObj["height"] = data[key].svg["16"].height
    attrObj["viewBox"] = "0 0 " + data[key].svg["16"].width + " " + data[key].svg["16"].height

    var computedSize = closestSize(options["height"])

    // If the user passed in options
    if (options) {

      if(options["height"]) {
        attrObj["viewBox"] = "0 0 " + data[key].svg[computedSize].width + " " + data[key].svg[computedSize].height
      }

      // If any of the width or height is passed in
      if(options["width"] || options["height"]) {
        attrObj["width"] = options["width"] ? options["width"] : (parseInt(options["height"]) * data[key].svg[computedSize].width / data[key].svg[computedSize].height)
        attrObj["height"] = options["height"] ? options["height"] : (parseInt(options["width"]) * data[key].svg[computedSize].height / data[key].svg[computedSize].width)
      }

      // If the user passed in class
      if (options["class"]) {
        attrObj["class"] = "octicon octicon-" + key + " " + options["class"]
        attrObj["class"].trim()
      }

      // If the user passed in aria-label
      if (options["aria-label"]) {
        attrObj["aria-label"] = options["aria-label"]
        attrObj["role"] = "img"

        // Un-hide the icon
        delete attrObj["aria-hidden"]
      }
    }

    Object.keys(attrObj).forEach(function(option) {
      attributes.push(option + "=\"" + attrObj[option] + "\"")
    })

    return attributes.join(" ").trim()
  }

  // Set the symbol for easy access
  data[key].symbol = key

  // Set all the default options
  data[key].options = {
    "version": "1.1",
    "class": "octicon octicon-" + key,
    "aria-hidden": "true"
  }

  // Function to return an SVG object
  data[key].toSVG = function(options) {
    return "<svg " + htmlAttributes(data[key], options) + ">" + data[key].svg[closestSize(options["height"])].path + "</svg>"
  }

  // Function to return an SVG object with a use, assuming you use the svg sprite
  data[key].toSVGUse = function(options) {
    var computedSize = closestSize(options["height"])
    return "<svg " + htmlAttributes(data[key], options) + "><use xlink:href=\"#" + key + "-" + computedSize + "\" /></svg>"
  }
})

// Import data into exports
module.exports = data
