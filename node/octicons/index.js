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
    const attrs = Object.assign({}, icon.options, options)

    // If the user passed in options
    if (options) {
      const {width, height} = options
      // If any of the width or height is passed in
      if (width || height) {
        attrs.width = width ? width : (parseInt(height) * icon.options.width) / icon.options.height
        attrs.height = height ? height : (parseInt(width) * icon.options.height) / icon.options.width
      }

      // If the user passed in class
      if (options['class']) {
        attrs['class'] = `octicon octicon-${key} ${options['class']}`
        attrs['class'].trim()
      }

      // If the user passed in aria-label
      if (options['aria-label']) {
        attrs['aria-label'] = options['aria-label']
        attrs.role = 'img'

        // Un-hide the icon
        delete attrs['aria-hidden']
      }
    }

    return Object.keys(attrs).reduce((list, attr) => {
      list.push(`${attr}="${attrs[attr]}"`)
      return list
    }, [])
  }
}

module.exports = icons
