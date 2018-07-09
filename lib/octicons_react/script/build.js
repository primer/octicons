#!/usr/bin/env node
const octicons = require('octicons')
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsFile = join(srcDir, 'icons.js')

function CamelCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const icons = [...Object.entries(octicons)]
  .map(([key, octicon]) => {
    const name = CamelCase(key)
    const {width, height, path} = octicon
    // convert attributes like fill-rule into JSX equivalents, e.g. fillRule
    const svg = path.replace(/([a-z]+)-([a-z]+)=/g, (_, a, b) => `${a}${CamelCase(b)}=`)
    const code = `function ${name}() {
  return ${svg}
}
${name}.size = [${width}, ${height}]
`

    return {
      key,
      name,
      octicon,
      code
    }
  })
  .sort((a, b) => a.key.localeCompare(b.key))

function writeIcons(file) {
  const count = icons.length
  const code = `/* THIS FILE IS GENERATED. DO NOT EDIT IT. */
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

fse
  .mkdirs(srcDir)
  .then(() => writeIcons(iconsFile))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
