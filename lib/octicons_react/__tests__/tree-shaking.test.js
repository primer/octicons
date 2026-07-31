const path = require('node:path')
const {rolldown} = require('rolldown')

const packageImport = path.resolve(__dirname, '..')

function virtual(code) {
  return {
    name: 'virtual',
    resolveId(id) {
      if (id === '__entrypoint__') return id
    },
    load(id) {
      if (id === '__entrypoint__') return code
    }
  }
}

test('tree shaking', async () => {
  const bundle = await rolldown({
    input: '__entrypoint__',
    external: [],
    plugins: [virtual(`import { AlertIcon } from '${packageImport}'`)],

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
  const bundle = await rolldown({
    input: '__entrypoint__',
    external: ['react'],
    plugins: [virtual(`export { XIcon } from '${packageImport}'`)]
  })
  const {output} = await bundle.generate({
    format: 'esm'
  })

  const bundleSize = Buffer.byteLength(output[0].code.trim()) / 1000
  expect(`${bundleSize}kB`).toMatchInlineSnapshot(`"6.482kB"`)
})
