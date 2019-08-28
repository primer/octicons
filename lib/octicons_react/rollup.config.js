import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

const COMMON = {
  plugins: [
    babel({
      babelrc: false,
      presets: [['env', {modules: false}], 'stage-0', 'react']
    }),
    commonjs()
  ]
}

export default [
  {
    ...COMMON,
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      name: 'reocticons'
    }
  },
  {
    ...COMMON,
    input: 'src/index.umd.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'reocticons'
    }
  }
]
