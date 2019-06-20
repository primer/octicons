const test = require('ava')
const fs = require('fs-extra')
const globby = require('globby')

const year = new Date().getFullYear()
const yearRegex = new RegExp(`Copyright \\(c\\) ${year} GitHub Inc\\.`)
const octiconsLib = fs.readdirSync('./lib/build/svg')
const octiconsData = require('../lib/build/data.json')

test(`LICENSE files have the current year ${year}`, t => {
  return globby(['**/LICENSE', '!**/node_modules/**/LICENSE', '!**/vendor/**/LICENSE']).then(paths => {
    t.plan(paths.length)
    return paths.map(path => {
      const license = fs.readFileSync(path, 'utf8')
      return t.regex(license, yearRegex, `The license "${path}" does not include the current year ${year}`)
    })
  })
})

test('SVG icons exist', t => {
  t.not(octiconsLib.length, 0, `We didn't find any svg files`)
})

test('No duplicate icons', t => {
  const names = {}
  for (const o of Object.values(octiconsData)) {
    if (names[o.name]) {
      t.fail(`Found duplicate '${o.name}' icons in the figma file. Please rename one of them.`)
    } else {
      names[o.name] = o
    }
  }
  t.pass()
})
