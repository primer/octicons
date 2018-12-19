const test = require('ava')
const fs = require('fs-extra')
const globby = require('globby')
const {join} = require('path')

const year = new Date().getFullYear()
const yearRegex = new RegExp(`Copyright \\(c\\) ${year} GitHub Inc\\.`)
const {packages} = require('../lerna.json')
const globs = packages.map(glob => join(glob, 'LICENSE'))

test(`LICENSE files have the current year ${year}`, t => {
  return globby(globs).then(paths => {
    t.plan(paths.length)
    return paths.map(path => {
      const license = fs.readFileSync(path, 'utf8')
      return t.regex(license, yearRegex, `The license "${path}" does not include the current year ${year}`)
    })
  })
})
