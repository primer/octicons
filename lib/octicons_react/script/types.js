#!/usr/bin/env node
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsSrc = join(srcDir, 'icons.d.ts')
const indexSrc = join(srcDir, '../index.d.ts')

const destDir = resolve(__dirname, '../dist')
const iconsDest = join(destDir, 'icons.d.ts')
const indexDest = join(destDir, 'index.d.ts')

fse.copy(iconsSrc, iconsDest).catch(die)
fse
  .readFile(indexSrc, 'utf8')
  .then(content => content.replace(/.\/__generated__\//g, './'))
  .then(fse.writeFile.bind(fse, indexDest))
  .catch(die)

function die(err) {
  console.error(err.stack)
  process.exit(1)
}
