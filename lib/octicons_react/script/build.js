#!/usr/bin/env node
const octicons = require('octicons')
const fse = require('fs-extra')
const {join} = require('path')

const DIR = 'icons'

function CamelCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const icons = [...Object.entries(octicons)].map(([key, octicon]) => {
  const name = CamelCase(key)
  const {width, height, path} = octicon
  const code = `import React from 'react'
export default function ${name}() {
return ${path}
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

const tasks = icons
  // sort them alphabetically
  .sort((a, b) => a.key.localeCompare(b.key))
  .map(({key, name, code}) => {
    const file = join(DIR, `${key}.js`)
    return fse.writeFile(file, code, 'utf8').then(() => ({key, name, file}))
  })

function writeIndex(icons) {
  const count = icons.length
  console.warn('wrote %d files to %s.', count, DIR)
  const file = join(DIR, 'index.js')
  const code = `/* THIS FILE IS GENERATED. DO NOT EDIT IT. */
${icons.map(({key, name}) => `import {default as ${name}} from './${key}'`).join('\n')}

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

Promise.all(tasks)
  .then(writeIndex)
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
