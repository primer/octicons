const fs = require('fs-extra')
const path = require('path')

const DATA_FILE_PATH = path.resolve(__dirname, '../lib/build/data.json')

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {
  const exists = await fs.exists(DATA_FILE_PATH)

  if (!exists) {
    console.error(
      `${DATA_FILE_PATH} does not exist. Run \`npm run build\` from the root directory then try building the Gatsby site again.`
    )
    return
  }

  const icons = JSON.parse(await fs.readFile(DATA_FILE_PATH))

  Object.values(icons).forEach(icon => {
    actions.createNode({
      ...icon,
      id: createNodeId(icon.name),
      parent: null,
      children: [],
      internal: {
        type: 'Icon',
        content: JSON.stringify(icon),
        contentDigest: createContentDigest(icon)
      }
    })
  })
}
