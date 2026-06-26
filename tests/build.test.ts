import path from 'node:path'
import {fileURLToPath} from 'node:url'
import execa from 'execa'
import {expect, test} from 'vitest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildScript = path.resolve(__dirname, '../script/build.js')

async function expectBuildToFail(args) {
  try {
    await execa(buildScript, args)
    throw new Error('Expected build script to fail')
  } catch (error) {
    expect(error.exitCode).toBe(1)
    expect(error.killed).toBe(false)
  }
}

test('builds an object with the correct shape', async () => {
  const {stdout} = await execa(
    buildScript,
    ['--input', 'icons/icon-a-16.svg', './icons/icon-a-24.svg', './icons/icon-b-16.svg'],
    {cwd: __dirname},
  )
  const icons = JSON.parse(stdout)
  expect(icons).toMatchSnapshot()
})

test('fails when input argument is missing', async () => {
  await expectBuildToFail()
})

test('fails when input file does not exist', async () => {
  await expectBuildToFail(['--input', 'fake-16.svg'])
})

test('fails when filename is missing a height', async () => {
  await expectBuildToFail(['--input', 'tests/icons/missing-height.svg'])
})

test('fails when height in filename does not match height attribute of SVG', async () => {
  await expectBuildToFail(['--input', 'tests/icons/height-mismatch-24.svg'])
})

test('fails when height attribute is missing', async () => {
  await expectBuildToFail(['--input', 'tests/icons/missing-height-attr-16.svg'])
})

test('fails when width attribute is missing', async () => {
  await expectBuildToFail(['--input', 'tests/icons/missing-width-attr-16.svg'])
})

test('fails when viewBox attribute is missing', async () => {
  await expectBuildToFail(['--input', 'tests/icons/missing-viewbox-attr-16.svg'])
})

test('fails when height attribute is invalid', async () => {
  await expectBuildToFail(['--input', 'tests/icons/invalid-height-attr-16.svg'])
})

test('fails when width attribute is invalid', async () => {
  await expectBuildToFail(['--input', 'tests/icons/invalid-width-attr-16.svg'])
})

test('fails when viewBox attribute is invalid', async () => {
  await expectBuildToFail(['--input', 'tests/icons/invalid-viewbox-attr-16.svg'])
})

test('fails when viewBox width does not match width attribute', async () => {
  await expectBuildToFail(['--input', 'tests/icons/viewbox-width-mismatch-16.svg'])
})

test('fails when viewBox height does not match height attribute', async () => {
  await expectBuildToFail(['--input', 'tests/icons/viewbox-height-mismatch-16.svg'])
})

test('ignores non-SVG input files', async () => {
  await expectBuildToFail(['--input', 'tests/build.js'])
})
