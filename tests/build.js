const path = require('path')

let execa

beforeAll(async () => {
  const execaModule = await import('execa')
  execa = execaModule.execa
})

test('builds an object with the correct shape', async () => {
  const {stdout} = await execa(
    path.resolve(__dirname, '../script/build.mjs'),
    ['--input', 'icons/icon-a-16.svg', './icons/icon-a-24.svg', './icons/icon-b-16.svg'],
    {cwd: __dirname},
  )
  expect(JSON.parse(stdout)).toMatchSnapshot()
})

test('fails when input argument is missing', async () => {
  await expect(execa(path.resolve(__dirname, '../script/build.mjs'))).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when input file does not exist', async () => {
  await expect(execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'fake-16.svg'])).rejects.toMatchObject(
    {
      exitCode: 1,
    },
  )
})

test('fails when filename is missing a height', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/missing-height.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when height in filename does not match height attribute of SVG', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/height-mismatch-24.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when height attribute is missing', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/missing-height-attr-16.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when width attribute is missing', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/missing-width-attr-16.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when viewBox attribute is missing', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/missing-viewbox-attr-16.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when height attribute is invalid', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/invalid-height-attr-16.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when width attribute is invalid', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/invalid-width-attr-16.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when viewBox attribute is invalid', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/invalid-viewbox-attr-16.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when viewBox width does not match width attribute', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/viewbox-width-mismatch-16.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('fails when viewBox height does not match height attribute', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/icons/viewbox-height-mismatch-16.svg']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})

test('ignores non-SVG input files', async () => {
  await expect(
    execa(path.resolve(__dirname, '../script/build.mjs'), ['--input', 'tests/build.js']),
  ).rejects.toMatchObject({
    exitCode: 1,
  })
})
