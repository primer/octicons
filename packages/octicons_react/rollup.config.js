import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import {readFileSync} from 'node:fs'

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

const dependencies = [
  ...Object.keys(packageJson.peerDependencies ?? {}),
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.devDependencies ?? {})
]

function createPackageRegex(name) {
  return new RegExp(`^${name}(/.*)?`)
}

const baseConfig = {
  input: 'src/index.js',
  external: dependencies.map(createPackageRegex),
  plugins: [
    babel({
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
    }),
    commonjs()
  ]
}

export default [
  {
    ...baseConfig,
    output: {
      file: `dist/index.js`,
      format: 'esm'
    }
  }
]
