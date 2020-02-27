/* eslint-env node */
const path = require('path')
const test = require('ava')
const execa = require('execa')
const yup = require('yup')

test('builds a JSON object with a valid schema', async t => {
  const schema = yup.array(
    yup.object({
      name: yup.string().required(),
      // `array().required()` doesn't work for `keywords` because
      // `array().required()` treats `[]` as a missing value.
      // `mixed().required()` ensures that the property is defined,
      // but doesn't ensure that it's an array.
      keywords: yup.array().ensure(),
      width: yup.number().required(),
      height: yup.number().required(),
      path: yup.string().required()
    })
  )

  const {stdout} = await execa(path.resolve(__dirname, '../script/build.js'), ['--input=../icons/**/*.svg'], {
    cwd: __dirname
  })

  const icons = JSON.parse(stdout)

  t.true(schema.isValidSync(Object.values(icons)))
})

test('fails when input arg is missing', async t => {
  try {
    await execa(path.resolve(__dirname, '../script/build.js'))
    t.fail() // Test should fail if execa() call doesn't throw an error
  } catch (error) {
    t.is(error.exitCode, 1)
    t.false(error.killed)
  }
})

test('fails when input file does not exist', async t => {
  try {
    await execa(path.resolve(__dirname, '../script/build.js'), ['--input=fake.svg'])
    t.fail() // Test should fail if execa() call doesn't throw an error
  } catch (error) {
    t.is(error.exitCode, 1)
    t.false(error.killed)
  }
})
