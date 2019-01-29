const SVGO = require('svgo')
const got = require('got')
const {ensureDir, removeSync, writeFile} = require('fs-extra')
const {join, resolve} = require('path')

const {FIGMA_DOMAIN = 'api.figma.com', FIGMA_TOKEN, FIGMA_FILE_URL} = process.env

const PQueue = require('p-queue')
const execa = require('execa')
const yaml = require('js-yaml')
const {readFileSync} = require('fs')

// this works around an issue with the TLS library that
// (apparently) every Node fetch() implementation uses
function fetchSSLFix(url) {
  return execa('curl', ['-sL', url]).then(res => res.stdout)
}

function loadYAML(path) {
  return yaml.safeLoad(readFileSync(path, 'utf8'))
}

function progress(current, total) {
  let percentage = Math.ceil((current * 10) / total)
  if (!Number.isFinite(percentage)) {
    console.warn(`ack! infinite % for (${current} * 10 / ${total})`)
    percentage = 0
  }
  const bar = ['[', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ']', ` ${Math.ceil((current * 100) / total)}%`]
  for (let i = 1; i <= percentage; i++) {
    bar[i] = '='
  }
  return bar.join('')
}

function queueTasks(tasks, options) {
  const queue = new PQueue(Object.assign({concurrency: 3}, options))
  for (const task of tasks) {
    queue.add(task)
  }
  queue.start()
  return queue.onIdle()
}

// Fail if there's no figma file key
let figmaFileKey = null
if (!figmaFileKey) {
  try {
    figmaFileKey = FIGMA_FILE_URL.match(/file\/([a-z0-9]+)\//i)[1]
  } catch (e) {
    console.log('Cannot find FIGMA_FILE_URL key in process!')
    throw e
  }
}

const svgo = new SVGO(loadYAML(join(process.cwd(), '.svgo.yml')))

// Where we're putting the exported SVG and data.json
// so the libraries can use it
const outputDir = resolve(process.cwd(), 'lib/build')
console.log(`output dir: ${outputDir}`)

removeSync(outputDir)
ensureDir(join(outputDir, 'svg')).then(() => {
  if (FIGMA_TOKEN) {
    console.log(`Exporting octicons from ${FIGMA_FILE_URL} file`)
    getFigmaComponents(figmaFileKey).catch(error => {
      console.log(`Error fetching components from Figma: ${error}`)
      process.exitCode = 1
    })
  } else {
    getUnpkgData().catch(error => {
      console.log(`Error fetching data from unpkg.com: ${error}`)
      process.exitCode = 1
    })
  }
})

function getFigmaComponents(figmaFileKey) {
  let dCount = 0
  let oCount = 0
  console.log('Getting components from the figma file')
  console.log(`Contacting ${FIGMA_DOMAIN}`)
  return got
    .get(`${FIGMA_DOMAIN}/v1/files/${figmaFileKey}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-figma-token': FIGMA_TOKEN
      },
      json: true
    })
    .then(response => {
      console.log('Processing response')

      const components = {}
      function check(c) {
        if (c.type === 'COMPONENT') {
          const {name, id} = c
          const {description = ''} = response.body.components[c.id]
          const {width, height} = c.absoluteBoundingBox
          // Keywords extracted from description when that's ready
          let keywords = description.match(/^keywords: (.+)$/im)
          // If we have a match, get keywords and split by comma
          keywords = keywords ? keywords.pop().split(', ') : []

          components[name] = {
            name,
            figma: {
              id,
              file: figmaFileKey
            },
            keywords,
            width,
            height
          }
        } else if (c.children) {
          // eslint-disable-next-line github/array-foreach
          c.children.forEach(check)
        }
      }

      // eslint-disable-next-line github/array-foreach
      response.body.document.children.forEach(check)
      oCount = Object.values(components).length
      if (oCount === 0) {
        throw Error('No octicons found!')
      }
      console.log(`${oCount} icons found in the figma file`)
      return components
    })
    .then(components => {
      const icons = Object.values(components)
      console.log(icons)
      // Make a query string with all the component ids
      const componentIds = icons.map(c => c.figma.id).join(',')
      // Request all the image export URLs from figma
      return getFigmaImageUrls(componentIds)
        .then(images => {
          console.log('Downloading SVG files from Figma (AWS)')
          console.log('')

          return queueTasks(
            icons.map(icon => () => {
              return got
                .get(images[icon.figma.id], {
                  headers: {
                    'Content-Type': 'images/svg+xml'
                  }
                })
                .on('downloadProgress', () => {
                   console.log(`${progress(dCount, oCount)} Downloading ${icon.name} icon`)
                })
                .then(response => {
                  const svg = response.body
                  dCount++
                  return svgo
                    .optimize(svg, {})
                    .then(optimized => {
                      icon.path = optimized.data.slice(optimized.data.indexOf('>') + 1).slice(0, -6)
                      const dir = resolve(outputDir, 'svg')
                      return ensureDir(dir).then(() => writeFile(join(dir, `${icon.name}.svg`), optimized.data, 'utf8'))
                    })
                    .catch(err => {
                      console.error('Something went wrong optimizing the svg data!', err)
                      process.exit(1)
                    })
                })
            })
          )
        })
        .then(() => {
          console.log(`Writing data out to ${outputDir}/data.json`)
          return writeFile(resolve(outputDir, 'data.json'), JSON.stringify(components), 'utf8')
            .then(() => {
              console.warn('\nAll done! Icons successfully exported.')
            })
        })
    })
}

function getFigmaImageUrls(componentIds) {
  console.log('Exporting figma components as SVG')
  return got
    .get(`${FIGMA_DOMAIN}/v1/images/${figmaFileKey}`, {
      query: {
        ids: componentIds,
        format: 'svg'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-figma-token': FIGMA_TOKEN
      },
      json: true
    })
    .then(response => {
      if (response.body.err) {
        throw response.body.err
      } else {
        console.log('Successfully exported components')
        return response.body.images
      }
    })
}

function getUnpkgData() {
  const {name, version} = require('../lib/octicons_node/package.json')
  const url = `https://raw.githubusercontent.com/primer/octicons/v${version}/package.json`
  return got
    .get(url, {json: true})
    .then(response => response.body)
    .then(pkg => {
      // same file; good to go!
      if (pkg.figma.url === FIGMA_FILE_URL) {
        const baseURL = `https://unpkg.com/${name}@${version}/build/`
        console.log('Getting components from unpkg.com')
        console.log('Fetching data.json...')
        return fetchAndWrite(baseURL, 'data.json', outputDir)
          .then(JSON.parse)
          .then(data => {
            const icons = Object.values(data)
            const total = icons.length
            let loaded = 0
            console.log('Fetching SVG files...')
            return queueTasks(
              icons.map(icon => () => {
                loaded++
                console.log(`${progress(loaded, total)} Downloading icon: ${icon.name}`)
                return fetchAndWrite(baseURL, `svg/${icon.name}.svg`, outputDir)
              })
            ).then(() => icons)
          })
          .then(icons => {
            console.log(`Wrote ${icons.length} icons to ${outputDir}/svg`)
            console.log(`Fetched ${icons.length} icons from unpkg.com/${name}@${version}`)
            return icons
          })
      } else {
        console.log(
          `FIGMA_FILE_URL mismatch in package.json:\n  "${FIGMA_FILE_URL}" (local)\n  "${pkg.figma.url}" (from: ${url})`
        )
        process.exitCode = 1
      }
    })
}

function fetchAndWrite(baseURL, file, dirname) {
  return fetchSSLFix(join(baseURL, file)).then(body => {
    return writeFile(join(dirname, file), body, 'utf8')
      .then(() => body)
  })
}
