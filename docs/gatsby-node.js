const path = require('path')
const icons = require('../lib/build/data.json')

exports.createPages = async ({actions}) => {
  const iconPageTemplate = path.resolve(__dirname, 'src/templates/icon-page.js')

  for (const icon of Object.values(icons)) {
    for (const [height, data] of Object.entries(icon.heights)) {
      actions.createPage({
        path: `${icon.name}-${height}`,
        component: iconPageTemplate,
        context: {
          name: icon.name,
          keywords: icon.keywords,
          width: data.width,
          height: parseInt(height, 10),
          // We're calling this field `svgPath` because
          // `path` is a reserved field name.
          svgPath: data.path,
          heights: Object.keys(icon.heights)
        }
      })
    }
  }
}
