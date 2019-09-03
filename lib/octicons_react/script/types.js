#!/usr/bin/env node
const octicons = require('../../build/data.json')
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsSrc = join(srcDir, 'icons.d.ts')
const indexSrc = join(srcDir, '../index.umd.d.ts')

const destDir = resolve(__dirname, '../dist')
const iconsDest = join(destDir, 'icons.d.ts')
const indexDest = join(destDir, 'index.umd.d.ts')

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

function CamelCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const octiconNames = [...Object.entries(octicons)]

const icons = octiconNames
  .map(([key, octicon]) => {
    const {width, height} = octicon
    const name = CamelCase(key)
    const type = `Icon<${width}, ${height}>`

    return {
      key,
      name,
      octicon,
      type
    }
  })
  .sort((a, b) => a.key.localeCompare(b.key))

function writeTypes() {
  for (const icon of icons) {
    const code = `${GENERATED_HEADER}
import * as React from 'react'

type Size = 'small' | 'medium' | 'large'
export interface OcticonProps {
  ariaLabel?: string
  children?: React.ReactElement<any>
  height?: number
  icon: Icon
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top'
  width?: number
}

declare const Octicon: React.SFC<OcticonProps>

declare module '${icon.name}.js' {
  export = Octicon
}`
    const file = join(__dirname, `../${icon.name}.d.ts`)
    fse.writeFileSync(file, code, 'utf8')
    console.log('%s', file)
  }
}

fse
  .copy(iconsSrc, iconsDest)
  .then(() => {
    return fse
      .readFile(indexSrc, 'utf8')
      .then(content => content.replace(/.\/__generated__\//g, './'))
      .then(content => fse.writeFile(indexDest, content, 'utf8'))
  })
  .then(() => writeTypes())
  .catch(die)

function die(err) {
  console.error(err.stack)
  process.exitCode = 1
}
