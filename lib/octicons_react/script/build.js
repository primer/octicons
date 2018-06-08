#!/usr/bin/env node
const octicons = require('octicons')
const fse = require('fs-extra')
const {join} = require('path')

const DIR = 'icons'

function camelCase(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

const icons = [...Object.entries(octicons)]
  .map(([key, octicon]) => {
    const name = camelCase(key)
    const {width, height, path} = octicon
    const code = `import React from 'react'
export default function ${name}() {
  return ${path}
}
${name}.size = [${width}, ${height}]
`

    return {
      key,
      octicon,
      code
    }
  })

const tasks = icons.map(({key, code}) => {
  return fse.writeFile(join(DIR, key + '.js'), code, 'utf8')
})

Promise.all(tasks).then(() => {
  console.warn('wrote %d files to %s.', tasks.length, DIR)
})
