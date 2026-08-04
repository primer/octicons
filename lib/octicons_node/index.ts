const data = require('./build/data.json')
const objectAssign = require('object-assign')

const DEFAULT_HEIGHT = 16

type Options = Record<string, string | number>
type HeightData = {
  options: Options
  path: string
  width: number
}
type IconData = {
  heights: Record<string, HeightData>
  symbol?: string
  toSVG?: (options?: Options) => string
}

const octicons = data as Record<string, IconData>

for (const key of Object.keys(octicons)) {
  // Returns a string representation of html attributes
  const htmlAttributes = (_icon: IconData, defaultOptions: Options, options?: Options) => {
    const attributes = []
    const attrObj = objectAssign({}, defaultOptions, options)

    // If the user passed in options
    if (options) {
      // If any of the width or height is passed in
      if (options['width'] || options['height']) {
        attrObj['width'] = options['width']
          ? options['width']
          : (parseInt(String(options['height'])) * Number(defaultOptions['width'])) / Number(defaultOptions['height'])
        attrObj['height'] = options['height']
          ? options['height']
          : (parseInt(String(options['width'])) * Number(defaultOptions['height'])) / Number(defaultOptions['width'])
      }

      // If the user passed in class
      if (options['class']) {
        attrObj['class'] = `octicon octicon-${key} ${options['class']}`
        attrObj['class'].trim()
      }

      // If the user passed in aria-label
      if (options['aria-label']) {
        attrObj['aria-label'] = options['aria-label']
        attrObj['role'] = 'img'

        // Un-hide the icon
        delete attrObj['aria-hidden']
      }
    }

    for (const option of Object.keys(attrObj)) {
      attributes.push(`${option}="${attrObj[option]}"`)
    }

    return attributes.join(' ').trim()
  }

  // Set the symbol for easy access
  octicons[key].symbol = key

  // Set options for each icon height
  for (const height of Object.keys(octicons[key].heights)) {
    octicons[key].heights[height].options = {
      version: '1.1',
      width: octicons[key].heights[height].width,
      height: parseInt(height),
      viewBox: `0 0 ${octicons[key].heights[height].width} ${height}`,
      class: `octicon octicon-${key}`,
      'aria-hidden': 'true',
      'data-component': 'Octicon',
    }
  }

  // Function to return an SVG object
  octicons[key].toSVG = function (options: Options = {}) {
    const {height, width} = options
    const naturalHeight = closestNaturalHeight(Object.keys(octicons[key].heights), height || width || DEFAULT_HEIGHT)
    return `<svg ${htmlAttributes(octicons[key], octicons[key].heights[naturalHeight].options, options)}>${
      octicons[key].heights[naturalHeight].path
    }</svg>`
  }
}

// Import data into exports
module.exports = octicons

function closestNaturalHeight(naturalHeights: Array<string>, height: string | number) {
  const requestedHeight = Number(height)
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= requestedHeight ? naturalHeight : acc), Number(naturalHeights[0]))
}
