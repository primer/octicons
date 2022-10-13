import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
// eslint-disable-next-line import/no-namespace
import * as octicons from '../octicons_react/dist/index.esm'

const icons = Object.keys(octicons).filter(name => name !== 'default')

export default [
  {
    input: 'src/__generated__/index.js',
    plugins: [
      babel({
        babelrc: false,
        presets: [
          [require.resolve('babel-preset-env'), {modules: false}],
          require.resolve('babel-preset-stage-0'),
          require.resolve('babel-preset-react')
        ]
      }),
      commonjs()
    ],
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'reocticons'
    }
  },
  ...icons.map(name => ({
    input: `src/__generated__/icons/${name}.js`,
    plugins: [
      babel({
        babelrc: false,
        presets: [
          [require.resolve('babel-preset-env'), {modules: false}],
          require.resolve('babel-preset-stage-0'),
          require.resolve('babel-preset-react')
        ]
      }),
      commonjs()
    ],
    output: {
      file: `dist/icons/${name}.js`,
      format: 'esm'
    }
  }))
]
