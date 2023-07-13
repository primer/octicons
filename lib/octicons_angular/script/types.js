#!/usr/bin/env node
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsSrc = join(srcDir, 'icons.d.ts')
const indexSrc = join(srcDir, '../index.d.ts')

const destDir = resolve(__dirname, '../dist')
const iconsDest = join(destDir, 'icons.d.ts')
const indexDest = join(destDir, 'index.d.ts')

fse
  .copy(iconsSrc, iconsDest)
  .then(() => {
    return fse
      .readFile(indexSrc, 'utf8')
      .then(content => content.replace(/.\/__generated__\//g, './'))
      .then(content => fse.writeFile(indexDest, content, 'utf8'))
  })
  .catch(die)

function die(err) {
  console.error(err.stack)
  process.exitCode = 1
}
