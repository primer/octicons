import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import {readFileSync} from 'fs'
import {name} from './package.json'

const formats = ['esm', 'umd'] // 'cjs' ?

const presets = [
  ['es2015', {modules: false}],
  'stage-0',
  'react'
]

export default {
  input: 'src/index.js',
  plugins: [
    babel({babelrc: false, presets}),
    commonjs()
  ],
  output: formats.map(format => ({
    file: `dist/index.${format}.js`,
    format,
    name: 'reocticons'
  }))
}
