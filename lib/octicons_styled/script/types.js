#!/usr/bin/env node
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsSrc = join(srcDir, 'index.d.ts')

const destDir = resolve(__dirname, '../dist')
const iconsDest = join(destDir, 'index.d.ts')

fse.copy(iconsSrc, iconsDest).catch(die)

function die(err) {
  console.error(err.stack)
  process.exitCode = 1
}
