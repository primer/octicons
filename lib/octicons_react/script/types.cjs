#!/usr/bin/env node
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsSrc = join(srcDir, 'icons.d.ts')
const indexSrc = join(srcDir, '../index.d.ts')

const destDir = resolve(__dirname, '../dist')
const iconsDest = join(destDir, 'icons.d.ts')
const iconsDestCts = join(destDir, 'icons.d.cts')
const indexDest = join(destDir, 'index.d.ts')
const indexDestCts = join(destDir, 'index.d.cts')

async function main() {
  await fse.copy(iconsSrc, iconsDest)
  await fse.copy(iconsSrc, iconsDestCts)

  let contents = await fse.readFile(indexSrc, 'utf8')
  contents = contents.replace(/.\/__generated__\//g, './')

  await fse.writeFile(indexDest, contents, 'utf8')
  await fse.writeFile(indexDestCts, contents, 'utf8')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
