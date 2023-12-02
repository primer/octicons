/* eslint-disable import/no-commonjs */
/* eslint-disable i18n-text/no-en */

const test = require('ava')
const fs = require('fs-extra')
const globby = require('globby')

const year = new Date().getFullYear()
const yearRegex = new RegExp(`Copyright \\(c\\) ${year} GitHub Inc\\.`)
const forticonsData = require('../lib/build/data.json')

test(`LICENSE files have the current year ${year}`, t => {
  return globby(['**/LICENSE', '!**/node_modules/**/LICENSE', '!**/vendor/**/LICENSE']).then(paths => {
    t.plan(paths.length)
    return paths.map(path => {
      const license = fs.readFileSync(path, 'utf8')
      return t.regex(license, yearRegex, `The license "${path}" does not include the current year ${year}`)
    })
  })
})

test('Data file exist', t => {
  t.not(forticonsData.length, 0, `We didn't find any data files`)
})

const names = {}
for (const forticon of Object.values(forticonsData)) {
  test(`No duplicate ${forticon.name} icon`, t => {
    if (names[forticon.name]) {
      t.fail(
        `Found duplicate '${forticon.name}' icons in the figma file. Please rename one of them. https://www.figma.com/file/${forticon.file}?node-id=${forticon.id}`
      )
    } else {
      names[forticon.name] = forticon
      t.pass()
    }
  })
}
