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
const branchName = GITHUB_REF.split('/').pop()

const writePackageJson = () => {
  fs.writeFileSync(join(process.cwd(), 'package.json'), JSON.stringify(pkg), 'utf8')
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
