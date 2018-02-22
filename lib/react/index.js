import React from "react";
import octicons from "octicons/index.js";

export default class Octicon extends React.Component {
  prepareAttributes(octicon) {
    const { width, ariaLabel } = this.props;
    const attr = octicon.options;
    let height = this.props.height;

    // Delete class set by octicons library
    delete attr["class"];

    // Read in small, medium, large props
    if (this.props.small) {
      height = 16;
    } else if (this.props.medium) {
      height = 32;
    } else if (this.props.large) {
      height = 64;
    }

    // If any of the width or height is passed in
    if (width || height) {
      attr["width"] = width
        ? width
        : parseInt(height) *
          octicon.options["width"] /
          octicon.options["height"];
      attr["height"] = height
        ? height
        : parseInt(width) *
          octicon.options["height"] /
          octicon.options["width"];
    }

    // If the user passed in aria-label
    if (ariaLabel) {
      attr["aria-label"] = ariaLabel;
      attr["role"] = "img";

      // Un-hide the icon
      delete attr["aria-hidden"];
    }

    return attr;
  }

  render() {
    const { name } = this.props;
    const octicon = octicons[name];

    if (octicon) {
      const svgStyle = {
        display: "inline-block",
        fill: "currentColor",
        verticalAlign: "text-bottom",
        position: "relative",
        userSelect: "none"
      };

      return (
        <svg
          {...this.prepareAttributes(octicon)}
          style={svgStyle}
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{ __html: octicon.path }}
        />
      );
    } else {
      throw new Error(`No such octicon: "${name}"!`);
    }
  }
}
