const semver = require('semver')
const fs = require('fs')
const {
  join,
  resolve
} = require('path')
 const {
  GITHUB_REF,
  GITHUB_SHA
} = process.env

const pkg = require(resolve(process.cwd(), 'package.json'))
const branchName = GITHUB_REF.replace(/^refs\/(heads|remotes\/origins)\//gi, "")

const writePackageJson = () => {
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), 'utf8')
}

// If it's a release branch
if (branchName.match(/^release-/i)) {
  console.log('Versioning release candidate')
  const newVersion = branchName.match(/^release-([\d\.]+)/i)
  pkg.version = `${newVersion[1]}-rc.${GITHUB_SHA.slice(0,7)}`
  writePackageJson()
}

 // Otherwise
else if (branchName != 'master') {
  console.log('Versioning prerelease')
  pkg.version = `${semver.inc(pkg.version, 'patch')}-alpha.${GITHUB_SHA.slice(0,7)}`
  writePackageJson()
}
