import fs from 'node:fs'
import path from 'node:path'
import {createRequire} from 'node:module'
import {rolldown} from 'rolldown'
import {BookmarkFilledIcon, PlayIcon, RepoDeletedIcon} from '@primer/octicons-react'

type Output = import('rolldown').OutputAsset | import('rolldown').OutputChunk

const packageRoot = path.resolve(import.meta.dirname, '..')
const iconsDir = path.join(packageRoot, 'dist', 'icons')
const require = createRequire(import.meta.url)
const commonjs = require('@primer/octicons-react')
const esmIcons = {BookmarkFilledIcon, PlayIcon, RepoDeletedIcon}

test.each(['BookmarkFilledIcon', 'RepoDeletedIcon', 'PlayIcon'] as const)(
  '%s keeps supported package entrypoints',
  async name => {
    const direct = await import(`@primer/octicons-react/${name}`)
    expect(direct.default).toBe(direct[name])
    expect(esmIcons[name]).toBe(direct[name])
    expect(commonjs[name].displayName).toBe(name)
    expect(fs.existsSync(path.join(iconsDir, `${name}.d.ts`))).toBe(true)
  },
)

test('ships deprecation guidance without deprecating the play alias', () => {
  for (const [name, replacement] of [
    ['BookmarkFilledIcon', 'BookmarkFillIcon'],
    ['RepoDeletedIcon', 'RepoDeleteIcon'],
  ]) {
    expect(fs.readFileSync(path.join(iconsDir, `${name}.d.ts`), 'utf8')).toContain(
      `@deprecated Use ${replacement} instead.`,
    )
    expect(fs.readFileSync(path.join(packageRoot, '../octicons_styled/dist/index.d.ts'), 'utf8')).toContain(
      `/** @deprecated Use ${replacement} instead. */\nexport const ${name}`,
    )
  }
  expect(fs.readFileSync(path.join(iconsDir, 'PlayIcon.d.ts'), 'utf8')).not.toContain('@deprecated')
})

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
  expect(barrel).toContain('import { AlertIcon } from "./icons/AlertIcon.mjs"')
  expect(barrel).toMatch(/export \{[^}]*\bAlertIcon\b[^}]*\}/)
  // A pure re-export barrel contains no rendering logic of its own.
  expect(barrel).not.toContain('forwardRef')
})

test('package.json exports expose the "." barrel and a per-icon "./*" subpath', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'))
  expect(pkg.exports['.'].types.import).toBe('./dist/index.d.mts')
  expect(pkg.exports['.'].types.require).toBe('./dist/index.d.cts')
  expect(pkg.exports['.'].import).toBe('./dist/index.esm.mjs')
  expect(pkg.exports['.'].require).toBe('./dist/index.umd.cjs')
  expect(pkg.exports['./*'].import).toBe('./dist/icons/*.mjs')
  expect(pkg.exports['./*'].types).toBe('./dist/icons/*.d.ts')
})

test('dynamic subpath imports are code-split into separate chunks', async () => {
  const bundle = await rolldown({
    input: path.join(import.meta.dirname, '__fixtures__', 'dynamic-imports.mts'),
    external: ['react'],
  })
  const {output} = await bundle.generate({format: 'esm'})

  // The entry plus one chunk per dynamically imported icon (and any shared
  // runtime chunk). More than a single chunk proves the icons are code-split
  // rather than bundled into the entry.
  expect(output.length).toBeGreaterThan(1)

  const entry = output.find((chunk: Output) => chunk.type === 'chunk' && chunk.isEntry)
  expect(entry).toBeDefined()
  if (!entry || entry.type !== 'chunk') {
    throw new Error('Expected an entry chunk')
  }
  // The entry itself must not inline any icon path data.
  expect(entry.code).not.toContain('octicon octicon-alert')
  expect(entry.code).not.toContain('octicon octicon-repo')
})
