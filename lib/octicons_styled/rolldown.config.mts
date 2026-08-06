import babel from '@rolldown/plugin-babel'
// eslint-disable-next-line import/no-namespace
import * as octicons from '../octicons_react/dist/index.esm.mjs'

const icons = Object.keys(octicons).filter(name => name !== 'default')

const babelPlugin = babel({
  presets: [['@babel/preset-env', {modules: false}], '@babel/preset-react', '@babel/preset-typescript'],
})

export default [
  {
    input: 'src/__generated__/index.js',
    experimental: {
      attachDebugInfo: 'none',
    },
    plugins: [babelPlugin],
    output: {
      file: 'dist/index.umd.cjs',
      format: 'umd',
      name: 'reocticons',
    },
  },
  {
    input: Object.fromEntries(icons.map(name => [`icons/${name}`, `src/__generated__/icons/${name}.js`])),
    experimental: {
      attachDebugInfo: 'none',
    },
    plugins: [babelPlugin],
    output: {
      dir: 'dist',
      format: 'esm',
    },
  },
]
