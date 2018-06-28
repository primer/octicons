import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [['env', {modules: false}], 'react']
    }),
    commonjs()
  ],
  output: {
    file: 'build/index.js',
    format: 'esm'
  }
}
