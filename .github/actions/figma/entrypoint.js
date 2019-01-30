const execa = require('execa')
const got = require('got')
const PQueue = require('p-queue')
const {
  ensureDir,
  removeSync,
  writeFile
} = require('fs-extra')
const {
  join,
  resolve
} = require('path')
const {
  FIGMA_TOKEN,
  FIGMA_FILE_URL
} = process.env


if (!FIGMA_TOKEN) {
  trow new Error(`Required: You must set a FIGMA_TOKEN in your Secrets. https://developer.github.com/actions/creating-workflows/storing-secrets/`)
}

// function queueTasks(tasks, options) {
//   const queue = new PQueue(Object.assign({
//     concurrency: 3
//   }, options))
//   for (const task of tasks) {
//     queue.add(task)
//   }
//   queue.start()
//   return queue.onIdle()
// }

// // Fail if there's no figma file key
// let figmaFileKey = null
// if (!figmaFileKey) {
//   try {
//     figmaFileKey = FIGMA_FILE_URL.match(/file\/([a-z0-9]+)\//i)[1]
//   } catch (e) {
//     console.log('Cannot find FIGMA_FILE_URL key in process!')
//     throw e
//   }
// }

// // Where we're putting the exported SVG and data.json
// // so the libraries can use it
// const outputDir = resolve(process.cwd(), 'lib/build')
// console.log(`output dir: ${outputDir}`)

// removeSync(outputDir)
// ensureDir(join(outputDir, 'svg')).then(() => {
//   console.log(`Exporting octicons from ${FIGMA_FILE_URL} file`)
//   getFigmaComponents(figmaFileKey).catch(error => {
//     console.log(`Error fetching components from Figma: ${error}`)
//     process.exitCode = 1
//   })
// })

// function getFigmaComponents(figmaFileKey) {
//   let dCount = 0
//   let oCount = 0
//   console.log('Getting components from the figma file')
//   console.log(`Contacting api.figma.com`)
//   return got
//     .get(`api.figma.com/v1/files/${figmaFileKey}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-figma-token': FIGMA_TOKEN
//       },
//       json: true
//     })
//     .then(response => {
//       console.log('Processing response')

//       const components = {}

//       function check(c) {
//         if (c.type === 'COMPONENT') {
//           const {
//             name,
//             id
//           } = c
//           const {
//             description = ''
//           } = response.body.components[c.id]
//           const {
//             width,
//             height
//           } = c.absoluteBoundingBox
//           // Keywords extracted from description when that's ready
//           let keywords = description.match(/^keywords: (.+)$/im)
//           // If we have a match, get keywords and split by comma
//           keywords = keywords ? keywords.pop().split(', ') : []

//           components[name] = {
//             name,
//             figma: {
//               id,
//               file: figmaFileKey
//             },
//             keywords,
//             width,
//             height
//           }
//         } else if (c.children) {
//           // eslint-disable-next-line github/array-foreach
//           c.children.forEach(check)
//         }
//       }

//       // eslint-disable-next-line github/array-foreach
//       response.body.document.children.forEach(check)
//       oCount = Object.values(components).length
//       if (oCount === 0) {
//         throw Error('No octicons found!')
//       }
//       console.log(`${oCount} icons found in the figma file`)
//       return components
//     })
//     .then(components => {
//       const icons = Object.values(components)
//       console.log(icons)
//       // Make a query string with all the component ids
//       const componentIds = icons.map(c => c.figma.id).join(',')
//       // Request all the image export URLs from figma
//       return getFigmaImageUrls(componentIds)
//         .then(images => {
//           console.log('Downloading SVG files from Figma (AWS)')

//           return queueTasks(
//             icons.map(icon => () => {
//               return got
//                 .get(images[icon.figma.id], {
//                   headers: {
//                     'Content-Type': 'images/svg+xml'
//                   }
//                 })
//                 .then(response => {
//                   const svg = response.body
//                   dCount++
//                   icon.path = svg.slice(optimized.data.indexOf('>') + 1).slice(0, -6)
//                   const dir = resolve(outputDir, 'svg')
//                   return ensureDir(dir).then(() => writeFile(join(dir, `${icon.name}.svg`), optimized.data, 'utf8'))
//                 })
//             })
//           )
//         })
//     })
// }

// function getFigmaImageUrls(componentIds) {
//   console.log('Exporting figma components as SVG')
//   return got
//     .get(`api.figma.com/v1/images/${figmaFileKey}`, {
//       query: {
//         ids: componentIds,
//         format: 'svg'
//       },
//       headers: {
//         'Content-Type': 'application/json',
//         'x-figma-token': FIGMA_TOKEN
//       },
//       json: true
//     })
//     .then(response => {
//       if (response.body.err) {
//         throw response.body.err
//       } else {
//         console.log('Successfully exported components')
//         return response.body.images
//       }
//     })
// }
