#!/usr/bin/env node
const octicons = require('../../build/data.json')
const fse = require('fs-extra')
const {join} = require('path')

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
  .then(() => writeTypes())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
