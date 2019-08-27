module.exports = {
  template: (babel, opts, {imports, componentName, props, jsx, exports}) => {
    // Replace the <svg></svg> wrapper with <Octicon />
    // For example:
    // <svg some="attr"><path /></svg> => <Octicon><path /></Octicon>
    const pathJsx = babel.types.jsxElement(
      babel.types.jsxOpeningElement(babel.types.jsxIdentifier('Octicon'), [
        babel.types.jsxSpreadAttribute(babel.types.identifier('props'))
      ]),
      babel.types.jsxClosingElement(babel.types.jsxIdentifier('Octicon')),
      jsx.children
    )

    return babel.template.ast`
      ${imports}
      import Octicon from '@primer/octicons-react'

      const ${componentName} = (${props}) => ${pathJsx}

      ${exports}
    `
  }
}
