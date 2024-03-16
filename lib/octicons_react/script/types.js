#!/usr/bin/env node
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsSrc = join(srcDir, 'icons.d.ts')
const indexSrc = join(srcDir, '../index.d.ts')

const destDir = resolve(__dirname, '../dist')
const iconsDest = join(destDir, 'icons.d.ts')
const indexDest = join(destDir, 'index.d.ts')

async function main() {
  await fse.copy(iconsSrc, iconsDest)

  let contents = await fse.readFile(indexSrc, 'utf8')
  contents = contents.replace(/.\/__generated__\//g, './')

  await fse.writeFile(indexDest, contents, 'utf8')
  await fse.writeFile(join(destDir, 'index.d.mts'), contents, 'utf8')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
