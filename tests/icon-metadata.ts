import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import execa from 'execa'
import {parseSync} from 'svgson'
import metadata from '../icon-metadata.json' with {type: 'json'}
import {applyIconMetadata, geometryFingerprint, pascalCase, type IconData} from '../script/icon-metadata.ts'

const builder = path.resolve(import.meta.dirname, '../script/build.ts')
const sourceDirectory = path.resolve(import.meta.dirname, '../icons')
const temporaryDirectories: Array<string> = []

function makeDirectory() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'octicons-metadata-'))
  temporaryDirectories.push(directory)
  fs.mkdirSync(path.join(directory, 'icons'))
  return directory
}

afterAll(() => {
  for (const directory of temporaryDirectories) fs.rmSync(directory, {recursive: true, force: true})
})

function sourceIcon(name: string, heights: Array<number>): IconData {
  return {
    name,
    keywords: ['existing'],
    heights: Object.fromEntries(
      heights.map(height => {
        const svg = fs.readFileSync(path.join(sourceDirectory, `${name}-${height}.svg`), 'utf8')
        return [height, {width: height, path: svg, ast: parseSync(svg, {camelcase: true})}]
      }),
    ),
  }
}

const circle = sourceIcon('triangle-circle', [16, 24])

test('preserves natural heights and keeps alias objects independent', () => {
  const icons = applyIconMetadata(
    {'triangle-circle': circle},
    {
      'triangle-circle': {
        defaultHeight: 24,
        aliases: {
          play: {heights: [16, 24]},
          'old-circle': {heights: [16], deprecated: true},
        },
      },
    },
    {play: ['original']},
  )

  expect(icons['triangle-circle'].defaultHeight).toBe(24)
  expect(icons.play).toMatchObject({name: 'play', aliasOf: 'triangle-circle', keywords: ['original']})
  expect(icons.play.defaultHeight).toBeUndefined()
  expect(icons.play.deprecated).toBeUndefined()
  expect(Object.keys(icons.play.heights)).toEqual(['16', '24'])
  expect(icons['old-circle'].deprecated).toBe(true)
  expect(Object.keys(icons['old-circle'].heights)).toEqual(['16'])
  expect(icons.play.heights['16']).toEqual(icons['triangle-circle'].heights['16'])
  expect(icons.play.heights['16']).not.toBe(icons['triangle-circle'].heights['16'])
  expect(circle.defaultHeight).toBeUndefined()
})

test.each([
  [null, 'must be an object'],
  [{missing: {}}, 'has no source SVGs'],
  [{'triangle-circle': {defaultHeight: 12}}, 'defaultHeight'],
  [{'triangle-circle': {unexpected: true}}, 'Unknown metadata field'],
  [{'triangle-circle': {aliases: []}}, 'aliases must be an object'],
  [{'triangle-circle': {aliases: {play: {heights: []}}}}, 'nonempty array'],
  [{'triangle-circle': {aliases: {play: {heights: [12]}}}}, 'available natural height'],
  [{'triangle-circle': {aliases: {play: {heights: ['16']}}}}, 'available natural height'],
  [{'triangle-circle': {aliases: {play: {heights: [16, 16]}}}}, 'duplicates'],
  [{'triangle-circle': {aliases: {play: {heights: [16], deprecated: 'yes'}}}}, 'must be a boolean'],
  [{'triangle-circle': {protectedGeometry: []}}, 'protectedGeometry must map'],
  [{'triangle-circle': {protectedGeometry: {'16': 'not-a-fingerprint'}}}, 'Invalid geometry fingerprint'],
  [{'triangle-circle': {protectedGeometry: {'12': '0'.repeat(64)}}}, 'has no source SVG'],
])('rejects invalid metadata %#', (config, message) => {
  expect(() => applyIconMetadata({'triangle-circle': circle}, config)).toThrow(String(message))
})

test('rejects source names that collide with compatibility aliases', () => {
  expect(() =>
    applyIconMetadata(
      {'triangle-circle': circle, play: {...circle, name: 'play'}},
      {'triangle-circle': metadata['triangle-circle']},
    ),
  ).toThrow('Alias "play" conflicts with a source icon')
})

test('rejects duplicate aliases and alias chains', () => {
  const icons = {'triangle-circle': circle, another: {...circle, name: 'another'}}
  expect(() =>
    applyIconMetadata(icons, {
      'triangle-circle': {aliases: {play: {heights: [16]}}},
      another: {aliases: {play: {heights: [16]}}},
    }),
  ).toThrow('conflicts with another alias')
  expect(() =>
    applyIconMetadata(icons, {'triangle-circle': {aliases: {another: {heights: [16]}}}, another: {}}),
  ).toThrow('conflicts with a source icon')
})

test('protects the original circled geometry independently of XML formatting', () => {
  const original = fs.readFileSync(path.join(sourceDirectory, 'triangle-circle-16.svg'), 'utf8')
  const formatted = original.replace('width="16" height="16"', 'height="16" width="16"').replace(/></g, '>\n  <')
  expect(geometryFingerprint(parseSync(formatted, {camelcase: true}))).toBe(
    metadata['triangle-circle'].protectedGeometry['16'],
  )
  expect(
    applyIconMetadata({'triangle-circle': circle}, {'triangle-circle': metadata['triangle-circle']}).play,
  ).toBeDefined()
})

test.each([16, 24])('rejects a bare replacement at %ipx during the build', async height => {
  const directory = makeDirectory()
  for (const size of [16, 24]) {
    fs.copyFileSync(
      path.join(sourceDirectory, `${size === height ? 'triangle' : 'triangle-circle'}-${size}.svg`),
      path.join(directory, 'icons', `triangle-circle-${size}.svg`),
    )
  }
  fs.writeFileSync(
    path.join(directory, 'metadata.json'),
    JSON.stringify({'triangle-circle': metadata['triangle-circle']}),
  )

  await expect(
    execa(builder, ['--input', 'icons/*.svg', '--metadata', 'metadata.json'], {cwd: directory}),
  ).rejects.toMatchObject({exitCode: 1, stderr: expect.stringContaining('differs from its approved geometry')})
})

test('ships legacy SVG copies and data keys from canonical source files', async () => {
  const directory = makeDirectory()
  for (const height of [16, 24]) {
    fs.copyFileSync(
      path.join(sourceDirectory, `triangle-circle-${height}.svg`),
      path.join(directory, 'icons', `triangle-circle-${height}.svg`),
    )
  }
  fs.writeFileSync(
    path.join(directory, 'metadata.json'),
    JSON.stringify({'triangle-circle': metadata['triangle-circle']}),
  )
  const {stdout} = await execa(
    builder,
    ['--input', 'icons/*.svg', '--metadata', 'metadata.json', '--svg-output', 'build/svg'],
    {cwd: directory},
  )
  const data = JSON.parse(stdout)
  expect(data.play.aliasOf).toBe('triangle-circle')
  expect(Object.keys(data.play.heights)).toEqual(['16', '24'])
  expect(data['triangle-circle'].protectedGeometry).toBeUndefined()
  for (const height of [16, 24]) {
    expect(fs.readFileSync(path.join(directory, 'build/svg', `play-${height}.svg`), 'utf8')).toBe(
      fs.readFileSync(path.join(sourceDirectory, `triangle-circle-${height}.svg`), 'utf8'),
    )
  }
})

test('keeps component-name generation consistent', () => {
  expect(pascalCase('bookmark-filled')).toBe('BookmarkFilled')
  expect(pascalCase('triangle-circle')).toBe('TriangleCircle')
  expect(pascalCase('git-pull-request-unlisted')).toBe('GitPullRequestUnlisted')
})
