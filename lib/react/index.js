import React from "react";
import octicons from "octicons";

export default class Octicon extends React.Component {
  prepareAttributes(octicon) {
    const { ariaLabel, medium, large } = this.props;
    const attr = Object.assign({}, octicon.options);
    // Default octicon sizes to small
    attr["height"] = 16;

    // Delete class set by octicons library
    delete attr["class"];

    // Read in small, medium, large props
    if (medium) {
      attr["height"] = 32;
    } else if (large) {
      attr["height"] = 64;
    }

    // Calculate the width based on height
    attr["width"] =
      attr["height"] * octicon.options["width"] / octicon.options["height"];

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
