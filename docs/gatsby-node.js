const path = require('path')
const icons = require('../lib/build/data.json')

exports.createPages = async ({actions}) => {
  const iconPageTemplate = path.resolve(__dirname, 'src/templates/icon-page.mdx')

  for (const icon of Object.values(icons)) {
    actions.createPage({
      path: icon.name,
      component: iconPageTemplate,
      context: {name: icon.name}
    })
  }
}
