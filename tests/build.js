/* eslint-env node */
const path = require('path')
const test = require('ava')
const execa = require('execa')

test('builds an object with the correct shape', t => {
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input', 'icon-a.svg', 'icon-b.svg'], {
    cwd: __dirname
  }).then(({stdout}) => {
    const icons = JSON.parse(stdout)
    t.snapshot(icons)
  })
})

test('fails when input arg is missing', t => {
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
  return execa(path.resolve(__dirname, '../script/build.js'), ['--input=fake.svg'])
    .then(() => {
      t.fail() // Test should fail if execa() call doesn't throw an error
    })
    .catch(error => {
      t.is(error.exitCode, 1)
      t.false(error.killed)
    })
})
