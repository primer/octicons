import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import babel from '@rollup/plugin-babel'

const packageJson = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

const dependencies = [
  ...Object.keys(packageJson.peerDependencies ?? {}),
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.devDependencies ?? {})
]

function createPackageRegex(name) {
  return new RegExp(`^${name}(/.*)?`)
}

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const iconsDir = path.resolve(__dirname, 'src/__generated__/icons')

// One entry per generated icon module (plus the barrel) so `dist/` mirrors the
// source tree: `dist/index.js`, `dist/icons/AlertIcon.js`, etc. This
// enables `import('@primer/octicons-react/AlertIcon')` codesplitting while the
// barrel keeps existing named imports working and tree-shakeable.
const iconInputs = Object.fromEntries(
  fs
    .readdirSync(iconsDir)
    .filter(file => file.endsWith('.js') && file !== 'index.js')
    .map(file => [`icons/${path.basename(file, '.js')}`, path.join(iconsDir, file)])
)

const babelPlugin = babel({
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ],
    '@babel/preset-react'
  ],
  babelHelpers: 'bundled'
})

const external = dependencies.map(createPackageRegex)

export default [
  {
    input: {
      index: 'src/index.js',
      ...iconInputs
    },
    external,
    plugins: [babelPlugin],
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js'
    }
  }
]
