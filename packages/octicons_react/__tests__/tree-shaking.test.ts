import path from 'node:path'
import {fileURLToPath} from 'node:url'
import commonjs from '@rollup/plugin-commonjs'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import virtual from '@rollup/plugin-virtual'
import {rollup} from 'rollup'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const packageImport = path.resolve(__dirname, '..')

test('tree shaking', async () => {
  const bundle = await rollup({
    input: '__entrypoint__',
    external: [],
    plugins: [
      nodeResolve(),
      commonjs(),
      virtual({
        __entrypoint__: `import { AlertIcon } from '${packageImport}'`,
      }),
    ],

    onwarn: ({code, message}) => {
      if (code !== 'EMPTY_BUNDLE') {
        throw new Error(message)
      }
    },
  })
  const {output} = await bundle.generate({
    format: 'esm',
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
        __entrypoint__: `export { XIcon } from '${packageImport}'`,
      }),
    ],
  })
  const {output} = await bundle.generate({
    format: 'esm',
  })

  const bundleSize = Buffer.byteLength(output[0].code.trim()) / 1000
  expect(`${bundleSize}kB`).toMatchInlineSnapshot(`"6.139kB"`)
})
