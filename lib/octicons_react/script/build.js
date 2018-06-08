'use strict';

const transform = require('babel-core').transform;
const octicons = require('octicons');
const fs = require('fs-extra');
const path = require('path');
const lodash = require('lodash')

const BUILD_PATH = path.join(__dirname, '..', 'build');

fs.emptyDirSync(BUILD_PATH)

// Transform code with babel
const getTransformedSourceCode = (originalSource) => transform(originalSource, {
  presets: [ 'env', 'react' ]
}).code;

/**
 * Template: React components
 */
const getReactSource = ({ componentName, options, svgPaths }) => {
  let m = []
  while ((m = /\s([a-z]*\-[a-z]*)=/gi.exec(svgPaths)) != null) {
    let mat = m.pop()
    svgPaths = svgPaths.replace(mat, lodash.camelCase(mat))
  }
  return getTransformedSourceCode(`
import createIconComponent from '../utils/createIconComponent';
import React from 'react';
const ${componentName} = createIconComponent({ content: <g>${svgPaths}</g>, options: ${options} });
${componentName}.displayName = '${componentName}';
export default ${componentName};
`);
}

/**
 * Template: createIconComponent
 */
const getCreateIconSource = () => getTransformedSourceCode(`
import React from "react";

const createIconComponent = ({ content, options }) => {

  const prepare = props => {
    const { ariaLabel, medium, large } = props;
    const attributes = Object.assign({}, options)

    // Default octicon sizes to small
    attributes["height"] = 16;

    // Read in small, medium, large props
    if (medium) {
      attributes["height"] = 32;
    } else if (large) {
      attributes["height"] = 64;
    }

    // Calculate the width based on height
    attributes["width"] =
      attributes["height"] * options["width"] / options["height"];

    // If the user passed in aria-label
    if (ariaLabel) {
      attributes["aria-label"] = ariaLabel;
      attributes["role"] = "img";

      // Un-hide the icon
      delete attributes["aria-hidden"];
    }

    return attributes;
  };

  const alignment = props => {
    const { top, middle } = props;

    if (top) {
      return "text-top";
    } else if (middle) {
      return "middle";
    }
    return "text-bottom";
  };

  return (props) => {
    const svgStyle = {
      display: "inline-block",
      fill: "currentColor",
      verticalAlign: alignment(props),
      userSelect: "none"
    };

    return (
      <svg
        {...prepare(props)}
        style={svgStyle} >
        {content}
      </svg>
    )
  }
}

export default createIconComponent;
`);

/**
 * Template: getIconNamedSource
 */
const getIconNamedSource = () => {
  return getTransformedSourceCode(Object.values(octicons).map((octicon) => {
    const { name } = octicon;
    const componentName = `${lodash.upperFirst(lodash.camelCase(name))}Octicon`;
    return `export const ${componentName} = require('./build/icons/${name}.js').default;`
  }).join('\n') +
  `export default "Error: To import all octicons, try require('@github/octicons-react')"`)
}

/**
 * Template: getPackageIndexSource
 */
const getPackageIndexSource = () => {
  const icons = Object.values(octicons).map((octicon) => {
    const { name } = octicon;
    const componentName = `${lodash.upperFirst(lodash.camelCase(name))}Octicon`;
    return `octicons['${name}'] = require('./icons/${name}.js').default;`
  })
  return getTransformedSourceCode(`
    import React from 'react';
    let octicons = {};
    ${icons.join('\n')}
    export default class Octicon extends React.Component {
      render() {
        const { name } = this.props;
        const Octicon = octicons[name];
        if (Octicon) {
          return (
            <Octicon {...this.props}/>
          )
        } else {
          throw new Error('No such octicon: "' + name + '!');
        }
      }
    }
  `)
}

const files = Object.values(octicons).map((octicon) => {
  const { name, options, path } = octicon;
  const componentName = `${lodash.upperFirst(lodash.camelCase(name))}Octicon`;
  delete options["class"];
  return {
    filepath: `icons/${name}.js`,
    source: getReactSource({componentName: componentName, options: JSON.stringify(options), svgPaths: path})
  }
})

files.push({
  filepath: 'utils/createIconComponent.js',
  source: getCreateIconSource()
})

files.push({
  filepath: 'index.js',
  source: getPackageIndexSource()
})

files.push({
  filepath: '../named.js',
  source: getIconNamedSource()
})

files.forEach((file) => {
  fs.outputFile(path.join(BUILD_PATH, file.filepath), file.source);
})
