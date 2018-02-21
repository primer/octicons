import React from 'react'
import octicons from 'octicons'

export default class Octicon extends React.Component {

  prepareAttributes(octicon) {
    const {height, width, ariaLabel} = this.props

    const attr = octicon.options

    // If any of the width or height is passed in
    if(width || height) {
      attr["width"] = width ? width : (parseInt(height) * octicon.options["width"] / octicon.options["height"])
      attr["height"] = height ? height : (parseInt(width) * octicon.options["height"] / octicon.options["width"])
    }

    // If the user passed in aria-label
    if (ariaLabel) {
      attr["aria-label"] = ariaLabel
      attr["role"] = "img"

      // Un-hide the icon
      delete attr["aria-hidden"]
    }

    return attr
  }

  render() {
    const {name} = this.props
    const octicon = octicons[name]

    if (octicon) {
      const svgStyle = {
        display: "inline-block",
        fill: "currentColor",
        verticalAlign: "text-bottom",
        position: "relative",
        userSelect: "none"
      }

      return (
        <svg
          {...this.prepareAttributes(octicon)}
          style={svgStyle}
          dangerouslySetInnerHTML={ {__html: octicon.path } }>
        </svg>
      )
    } else {
      throw new Error(`No such octicon: "${name}"!`)
    }
  }
}
