const fs = require('fs')
const {
  resolve
} = require('path')
 const {
  GITHUB_REF,
  GITHUB_SHA
} = process.env

// Octicons package
const pkg = require(resolve(process.cwd(), 'package.json'))

// GitHub info
const branchName = GITHUB_REF.replace('refs/heads/', '')
const shortSha = GITHUB_SHA.slice(0,7)
let releaseMatch = null

const writePackageJson = () => {
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), 'utf8')
}

// If it's a release branch
if (releaseMatch = branchName.match(/^release-([\d\.]+)/i)) {
  console.log('Versioning release candidate')
  console.log(`${pkg.version} => ${releaseMatch[1]}`)
  pkg.version = `${releaseMatch[1]}-rc.${shortSha}`
  writePackageJson()
}

 // Otherwise
else if (branchName != 'main') {
  const newVersion = `0.0.0-${shortSha}`
  console.log('Versioning prerelease')
  console.log(`${pkg.version} => ${newVersion}`)
  pkg.version = newVersion
  writePackageJson()
}
