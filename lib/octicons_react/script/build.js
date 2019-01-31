#!/usr/bin/env node
const octicons = require('../../build/data.json')
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsFile = join(srcDir, 'icons.js')
const typesFile = join(srcDir, 'icons.d.ts')

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

function CamelCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const octiconNames = [...Object.entries(octicons)]

const icons = octiconNames
  .map(([key, octicon]) => {
    const name = CamelCase(key)
    const {width, height, path} = octicon
    // convert attributes like fill-rule into JSX equivalents, e.g. fillRule
    const svg = path.replace(/([a-z]+)-([a-z]+)=/g, (_, a, b) => `${a}${CamelCase(b)}=`)
    const type = `Icon<${width}, ${height}>`
    const code = `function ${name}() {
  return ${svg}
}
${name}.size = [${width}, ${height}]
`

    return {
      key,
      name,
      octicon,
      type,
      code
    }
  })
  .sort((a, b) => a.key.localeCompare(b.key))

function writeIcons(file) {
  const count = icons.length
  const code = `${GENERATED_HEADER}
import React from 'react'

${icons.map(({code}) => code).join('\n')}

const iconsByName = {
  ${icons.map(({key, name}) => `'${key}': ${name}`).join(',\n  ')}
}

function getIconByName(name) {
  return iconsByName[name]
}

export {
  getIconByName,
  iconsByName,
  ${icons.map(({name}) => name).join(',\n  ')}
}`
  return fse.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s with %d exports', file, count)
    return icons
  })
}

function writeTypes(file) {
  const count = icons.length
  const code = `${GENERATED_HEADER}
import * as React from 'react'

type Icon<
  W extends number = number,
  H extends number = number
> = React.SFC<{}> & { size: [W, H] };

${icons.map(({name, type}) => `declare const ${name}: ${type}`).join('\n')}

type iconsByName = {
  ${icons.map(({key, type}) => `'${key}': ${type}`).join(',\n  ')}
}
declare const iconsByName: iconsByName

declare function getIconByName<T extends keyof iconsByName>(
  name: T
): iconsByName[T];
declare function getIconByName(name: string): Icon | undefined

export {
  Icon,
  getIconByName,
  iconsByName,
  ${icons.map(({name}) => name).join(',\n  ')}
}`
  return fse.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s with %d exports', file, count)
    return icons
  })
}

fse
  .mkdirs(srcDir)
  .then(() => writeIcons(iconsFile))
  .then(() => writeTypes(typesFile))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
