module.exports = {
  template: (babel, opts, {imports, componentName, props, jsx, exports}) => {
    // Replace the <svg></svg> wrapper with <React.Fragment />
    // For example:
    // <svg some="attr"><path /><path /></svg> => <React.Fragment><path /><path /></React.Fragment>
    const pathJsx = babel.types.jsxElement(
      babel.types.jsxOpeningElement(babel.types.jsxIdentifier('React.Fragment'), []),
      babel.types.jsxClosingElement(babel.types.jsxIdentifier('React.Fragment')),
      jsx.children
    )

    const viewBox = jsx.openingElement.attributes.find(attr => attr.name.name === 'viewBox')
    const iconName = componentName.name.replace('Svg', '')
    const iconJsx = babel.types.jsxElement(
      babel.types.jsxOpeningElement(babel.types.jsxIdentifier('Octicon'), [babel.types.jsxSpreadAttribute(props)]),
      babel.types.jsxClosingElement(babel.types.jsxIdentifier('Octicon')),
      [
        babel.types.jsxElement(
          babel.types.jsxOpeningElement(babel.types.jsxIdentifier(componentName.name), [], true),
          null,
          [],
          true
        )
      ]
    )

    return babel.template.ast`
      ${imports}
      import Octicon from '../index.js'

      const ${componentName} = () => ${pathJsx}
      ${viewBox &&
        babel.template.ast`
        ${componentName}.size = [${viewBox.value.value
          .replace('0 0 ', '')
          .split(' ')
          .join(', ')}]
      `}

      const ${iconName} = (${props}) => ${iconJsx}

      export default ${iconName}
    `
  }
}
