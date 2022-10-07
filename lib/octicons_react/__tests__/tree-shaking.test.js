const path = require('node:path')
const commonjs = require('@rollup/plugin-commonjs')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const {rollup} = require('rollup')
const virtual = require('@rollup/plugin-virtual')

const packageImport = path.resolve(__dirname, '..')

test('tree shaking', async () => {
  const bundle = await rollup({
    input: '__entrypoint__',
    external: [],
    plugins: [
      nodeResolve(),
      commonjs(),
      virtual({
        __entrypoint__: `import { AlertIcon } from '${packageImport}'`
      })
    ],

    onwarn: ({code, message}) => {
      if (code !== 'EMPTY_BUNDLE') {
        throw new Error(message)
      }
    }
  })
  const {output} = await bundle.generate({
    format: 'esm'
  })

  for (const {code} of output) {
    expect(code.trim()).toBe('')
  }
})

test('tree shaking single export', async () => {
  const bundle = await rollup({
    input: '__entrypoint__',
    external: ['react'],
    plugins: [
      nodeResolve(),
      commonjs(),
      virtual({
        __entrypoint__: `export { XIcon } from '${packageImport}'`
      })
    ]
  })
  const {output} = await bundle.generate({
    format: 'esm'
  })

  const bundleSize = Buffer.byteLength(output[0].code.trim()) / 1000
  expect(`${bundleSize}kB`).toMatchInlineSnapshot(`"2.595kB"`)
})
