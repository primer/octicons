const commonjs = require('@rollup/plugin-commonjs')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const {rollup} = require('rollup')
const virtual = require('@rollup/plugin-virtual')

test('tree shaking', async () => {
  const bundle = await rollup({
    input: '__entrypoint__',
    external: [],
    plugins: [
      nodeResolve(),
      commonjs(),
      virtual({
        __entrypoint__: `import { AlertIcon } from '@primer/octicons-react'`
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
        __entrypoint__: `export { XIcon } from '@primer/octicons-react'`
      })
    ]
  })
  const {output} = await bundle.generate({
    format: 'esm'
  })

  expect(`${Buffer.byteLength(output[0].code.trim()) / 1000}kB`).toMatchInlineSnapshot(`"2.345kB"`)
})
