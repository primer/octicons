/* eslint-disable import/no-commonjs */
const path = require('path')
const test = require('ava')
const execa = require('execa')

test('builds an object with the correct shape', t => {
  return execa(
    path.resolve(__dirname, '../script/build.js'),
    ['--input', 'icons/icon-a-16.svg', './icons/icon-a-24.svg', './icons/icon-b-16.svg'],
    {cwd: __dirname},
  ).then(({stdout}) => {
    const icons = JSON.parse(stdout)
    t.snapshot(icons)
  })
})

test('fails when input argument is missing', t => {
  return execa(path.resolve(__dirname, '../script/build.js'))
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when input file does not exist', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'fake-16.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when filename is missing a height', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/missing-height.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when height in filename does not match height attribute of SVG', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/height-mismatch-24.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when height attribute is missing', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/missing-height-attr-16.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when width attribute is missing', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/missing-width-attr-16.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when viewBox attribute is missing', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/missing-viewbox-attr-16.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when height attribute is invalid', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/invalid-height-attr-16.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when width attribute is invalid', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/invalid-width-attr-16.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when viewBox attribute is invalid', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/invalid-viewbox-attr-16.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when viewBox width does not match width attribute', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/viewbox-width-mismatch-16.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('fails when viewBox height does not match height attribute', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/icons/viewbox-height-mismatch-16.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})

test('ignores non-SVG input files', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'tests/build.js'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})
