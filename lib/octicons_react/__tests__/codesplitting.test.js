const path = require('node:path')
const fs = require('node:fs')
const {rollup} = require('rollup')

const packageRoot = path.resolve(__dirname, '..')
const iconsDir = path.join(packageRoot, 'dist', 'icons')

test('emits one pre-transformed module per icon', () => {
  const alert = fs.readFileSync(path.join(iconsDir, 'AlertIcon.mjs'), 'utf8')
  // The generated icon is a finished forwardRef component using the shared
  // renderOcticon runtime, not a runtime createIconComponent factory call.
  expect(alert).toContain('React.forwardRef')
  expect(alert).toContain('renderOcticon(')
  expect(alert).not.toContain('createIconComponent')
  // Per-icon declaration file is emitted alongside for subpath type resolution.
  expect(fs.existsSync(path.join(iconsDir, 'AlertIcon.d.ts'))).toBe(true)
})

test('the barrel is a pure re-export of the per-icon modules', () => {
  const barrel = fs.readFileSync(path.join(packageRoot, 'dist', 'index.esm.mjs'), 'utf8')
  expect(barrel).toContain("export { AlertIcon } from './icons/AlertIcon.mjs'")
  // A pure re-export barrel contains no rendering logic of its own.
  expect(barrel).not.toContain('forwardRef')
})

test('package.json exports expose the "." barrel and a per-icon "./*" subpath', () => {
  const pkg = require(path.join(packageRoot, 'package.json'))
  expect(pkg.exports['.'].import).toBe('./dist/index.esm.mjs')
  expect(pkg.exports['.'].require).toBe('./dist/index.umd.js')
  expect(pkg.exports['./*'].import).toBe('./dist/icons/*.mjs')
  expect(pkg.exports['./*'].types).toBe('./dist/icons/*.d.ts')
})

test('dynamic subpath imports are code-split into separate chunks', async () => {
  const bundle = await rollup({
    input: path.join(__dirname, '__fixtures__', 'dynamic-imports.mjs'),
    external: ['react']
  })
  const {output} = await bundle.generate({format: 'esm'})

  // The entry plus one chunk per dynamically imported icon (and any shared
  // runtime chunk). More than a single chunk proves the icons are code-split
  // rather than bundled into the entry.
  expect(output.length).toBeGreaterThan(1)

  const entry = output.find(chunk => chunk.isEntry)
  // The entry itself must not inline any icon path data.
  expect(entry.code).not.toContain('octicon octicon-alert')
  expect(entry.code).not.toContain('octicon octicon-repo')
})
