import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import alias from 'rollup-plugin-alias'

const COMMON = {
  external: ['react', 'prop-types'],
  plugins: [
    babel({
      babelrc: false,
      presets: [['env', {modules: false}], 'stage-0', 'react'],
      plugins: ['external-helpers']
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
    plugins: [
      // Add support for importing from "@primer/octicons-react" (as all the individual icon bundles do) to the UMD bundle
      alias({
        resolve: ['.jsx', '.js'],
        entries: [
          {
            find: '@primer/octicons-react',
            replacement: './../src/index.js'
          }
        ]
      }),
      ...COMMON.plugins
    ],
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'reocticons'
    }
  }
]
