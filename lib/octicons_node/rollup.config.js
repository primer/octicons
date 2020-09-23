import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

const formats = ['esm', 'umd', 'cjs']

export default {
  input: 'index.js',
  plugins: [commonjs(), json()],
  output: formats.map(format => ({
    file: `dist/index.${format}.js`,
    format,
    name: 'octicons'
  }))
}
