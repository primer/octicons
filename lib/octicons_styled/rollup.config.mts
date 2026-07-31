import babel from '@rollup/plugin-babel'
// eslint-disable-next-line import/no-namespace
import * as octicons from '@primer/octicons-react'

const icons = Object.keys(octicons).filter(name => name !== 'default')

export default [
  {
    input: 'src/__generated__/index.js',
    plugins: [
      babel({
        babelrc: false,
        presets: [
          [require.resolve('@babel/preset-env'), {modules: false}],
          require.resolve('@babel/preset-react'),
          require.resolve('@babel/preset-typescript'),
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'inline',
      }),
    ],
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'reocticons',
    },
  },
  {
    input: Object.fromEntries(icons.map(name => [`icons/${name}`, `src/__generated__/icons/${name}.js`])),
    plugins: [
      babel({
        babelrc: false,
        presets: [
          [require.resolve('@babel/preset-env'), {modules: false}],
          require.resolve('@babel/preset-react'),
          require.resolve('@babel/preset-typescript'),
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'bundled',
      }),
    ],
    output: {
      dir: 'dist',
      format: 'esm',
    },
  },
]
