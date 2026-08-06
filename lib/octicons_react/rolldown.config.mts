import fs from 'fs'
import path from 'path'
import babel from '@rolldown/plugin-babel'
import packageJson from './package.json' with {type: 'json'}

const dependencies = [
  ...Object.keys(packageJson.peerDependencies ?? {}),
  ...Object.keys(Reflect.get(packageJson, 'dependencies') ?? {}),
  ...Object.keys(packageJson.devDependencies ?? {}),
]

function createPackageRegex(name: string) {
  return new RegExp(`^${name}(/.*)?`)
}

const iconsDir = path.resolve(import.meta.dirname, 'src/__generated__/icons')

// One entry per generated icon module (plus the barrel) so `dist/` mirrors the
// source tree: `dist/index.esm.mjs`, `dist/icons/AlertIcon.mjs`, etc. This
// enables `import('@primer/octicons-react/AlertIcon')` codesplitting while the
// barrel keeps existing named imports working and tree-shakeable.
const iconInputs = Object.fromEntries(
  fs
    .readdirSync(iconsDir)
    .filter(file => file.endsWith('.js') && file !== 'index.js')
    .map(file => [`icons/${path.basename(file, '.js')}`, path.join(iconsDir, file)]),
)

const babelPlugin = babel({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
})

const external = dependencies.map(createPackageRegex)

export default [
  {
    input: {
      'index.esm': 'src/index.ts',
      ...iconInputs,
    },
    experimental: {
      attachDebugInfo: 'none',
    },
    external,
    plugins: [babelPlugin],
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
    },
  },
  {
    input: 'src/index.ts',
    experimental: {
      attachDebugInfo: 'none',
    },
    external,
    plugins: [babelPlugin],
    output: {
      file: `dist/index.umd.cjs`,
      format: 'umd',
      name: 'reocticons',
      globals: {
        react: 'React',
      },
    },
  },
]
