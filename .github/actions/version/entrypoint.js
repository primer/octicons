const semver = require('semver')
const {
  join,
  resolve
} = require('path')

const pkg = require(resolve(process.cwd(), 'package.json'))

console.log(pkg)
