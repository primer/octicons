/* eslint-disable import/no-commonjs */
/* global expect, test */
const path = require('path')
const execa = require('execa')

const buildScript = path.resolve(__dirname, '../script/build.js')

async function expectFailure(args = []) {
  await expect(execa(buildScript, args)).rejects.toMatchObject({
    exitCode: 1,
    killed: false,
  })
}

test('builds an object with the correct shape', async () => {
  const {stdout} = await execa(
    path.resolve(__dirname, '../script/build.js'),
    ['--input', 'icons/icon-a-16.svg', './icons/icon-a-24.svg', './icons/icon-b-16.svg'],
    {cwd: __dirname},
  )
  expect(JSON.parse(stdout)).toMatchSnapshot()
})

test('fails when input argument is missing', async () => {
  await expectFailure()
})

test('fails when input file does not exist', async () => {
  await expectFailure(['--input', 'fake-16.svg'])
})

test('fails when filename is missing a height', async () => {
  await expectFailure(['--input', 'tests/icons/missing-height.svg'])
})

test('fails when height in filename does not match height attribute of SVG', async () => {
  await expectFailure(['--input', 'tests/icons/height-mismatch-24.svg'])
})

test('fails when height attribute is missing', async () => {
  await expectFailure(['--input', 'tests/icons/missing-height-attr-16.svg'])
})

test('fails when width attribute is missing', async () => {
  await expectFailure(['--input', 'tests/icons/missing-width-attr-16.svg'])
})

test('fails when viewBox attribute is missing', async () => {
  await expectFailure(['--input', 'tests/icons/missing-viewbox-attr-16.svg'])
})

test('fails when height attribute is invalid', async () => {
  await expectFailure(['--input', 'tests/icons/invalid-height-attr-16.svg'])
})

test('fails when width attribute is invalid', async () => {
  await expectFailure(['--input', 'tests/icons/invalid-width-attr-16.svg'])
})

test('fails when viewBox attribute is invalid', async () => {
  await expectFailure(['--input', 'tests/icons/invalid-viewbox-attr-16.svg'])
})

test('fails when viewBox width does not match width attribute', async () => {
  await expectFailure(['--input', 'tests/icons/viewbox-width-mismatch-16.svg'])
})

test('fails when viewBox height does not match height attribute', async () => {
  await expectFailure(['--input', 'tests/icons/viewbox-height-mismatch-16.svg'])
})

test('ignores non-SVG input files', async () => {
  await expectFailure(['--input', 'tests/build.js'])
})
