module.exports = {
  template: (babel, opts, {imports, componentName, props, jsx, exports}) => {
    // Replace the <svg></svg> wrapper with a fragment For example:
    // <svg><path /><path /></svg> => <React.Fragment><path /><path /></React.Fragment>
    const pathJsx = babel.types.jsxFragment(
      babel.types.jsxOpeningFragment(),
      babel.types.jsxClosingFragment(),
      jsx.children
    )
    return babel.template.ast`
      ${imports}
      const ${componentName} = (${props}) => ${pathJsx}
      ${exports}
    `
  }
}
