const icons = require('./build/data.json')

for (const key of Object.keys(icons)) {
  const icon = icons[key]

  // Set the symbol for easy access
  icon.symbol = key

  // Set all the default options
  icon.options = {
    version: '1.1',
    width: icon.width,
    height: icon.height,
    viewBox: `0 0 ${icon.width} ${icon.height}`,
    class: `octicon octicon-${key}`,
    'aria-hidden': 'true'
  }

  // Function to return an SVG object
  icon.toSVG = options => {
    return `<svg ${icon.getAttributes(options)}>${icon.path}</svg>`
  }

  // Returns a string representation of html attributes
  icon.getAttributes = options => {
    const attributes = []
    const attrObj = Object.assign({}, icon.options, options)

    // If the user passed in options
    if (options) {
      const {width, height} = options
      // If any of the width or height is passed in
      if (width || height) {
        attrObj.width = width ? width : (parseInt(height) * icon.options.width) / icon.options.height
        attrObj.height = height ? height : (parseInt(width) * icon.options.height) / icon.options.width
      }

      // If the user passed in class
      if (options['class']) {
        attrObj['class'] = `octicon octicon-${key} ${options['class']}`
        attrObj['class'].trim()
      }

      // If the user passed in aria-label
      if (options['aria-label']) {
        attrObj['aria-label'] = options['aria-label']
        attrObj.role = 'img'

        // Un-hide the icon
        delete attrObj['aria-hidden']
      }
    }

    Object.keys(attrObj).forEach(function(option) {
      attributes.push(`${option}="${attrObj[option]}"`)
    })

    return attributes.join(' ').trim()
  }
}

module.exports = icons
