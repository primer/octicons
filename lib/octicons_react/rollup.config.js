import babel from '@rollup/plugin-babel'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import packageJson from './package.json'

const external = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.devDependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {})
]

const baseConfig = {
  input: 'src/index.js',
  external: id => {
    return external.some(moduleId => {
      return id.startsWith(moduleId)
    })
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', {modules: false}], '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime'],
      babelHelpers: 'runtime'
    }),
    nodeResolve(),
    commonjs()
  ]
}

export default [
  {
    ...baseConfig,
    output: {
      file: `dist/index.esm.js`,
      format: 'esm'
    }
  },
  {
    ...baseConfig,
    output: {
      file: `dist/index.cjs.js`,
      format: 'commonjs'
    }
  },
  {
    ...baseConfig,
    external: ['react'],
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
