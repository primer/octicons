import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import packageJson from './package.json'

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
      file: `dist/index.esm.mjs`,
      format: 'esm'
    }
  },
  {
    ...baseConfig,
    output: {
      file: `dist/index.umd.js`,
      format: 'umd',
      name: 'reocticons',
      globals: {
        react: 'React'
      }
    }
  }
]
