import babel from '@rollup/plugin-babel'
// eslint-disable-next-line import/no-namespace
import * as octicons from '../octicons_react/dist/index.js'

const icons = Object.keys(octicons).filter(name => name !== 'default')

export default [
  {
    input: 'src/__generated__/index.js',
    plugins: [
      babel({
        babelrc: false,
        presets: [['@babel/preset-env', {modules: false}], '@babel/preset-react'],
        babelHelpers: 'inline'
      })
    ],
    output: {
      file: 'dist/index.cjs',
      format: 'umd',
      name: 'reocticons'
    }
  },
  {
    input: Object.fromEntries(icons.map(name => [`icons/${name}`, `src/__generated__/icons/${name}.js`])),
    plugins: [
      babel({
        babelrc: false,
        presets: [['@babel/preset-env', {modules: false}], '@babel/preset-react'],
        babelHelpers: 'bundled'
      })
    ],
    output: {
      dir: 'dist',
      format: 'esm'
    }
  }
]
