const semver = require('semver')
const {
  join,
  resolve
} = require('path')
const {
  GITHUB_SHA,
  GITHUB_REF
} = process.env

const pkg = require(resolve(process.cwd(), 'package.json'))

console.log(pkg.version)
console.log(GITHUB_REF, GITHUB_SHA)
