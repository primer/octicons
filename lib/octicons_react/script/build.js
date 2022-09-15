#!/usr/bin/env node
const octicons = require('../../build/data.json')
const {default: generate} = require('@babel/generator')
const t = require('@babel/types')
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsFile = join(srcDir, 'icons.js')
const typesFile = join(srcDir, 'icons.d.ts')

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

function pascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const icons = Object.entries(octicons)
  .map(([key, octicon]) => {
    const name = `${pascalCase(key)}Icon`
    const svgData = t.objectExpression(
      Object.entries(octicon.heights).map(([height, icon]) => {
        return t.objectProperty(
          t.stringLiteral(height),
          t.objectExpression([
            t.objectProperty(t.stringLiteral('width'), t.numericLiteral(icon.width)),
            t.objectProperty(t.stringLiteral('path'), svgToJSX(icon.ast))
          ])
        )
      })
    )
    const {code} = generate(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(name),
          t.callExpression(t.identifier('createIconComponent'), [
            // The name of the generated icon
            t.stringLiteral(name),
            // The className used on the underlying <svg> element
            t.stringLiteral(`octicon octicon-${key}`),
            svgData
          ])
        )
      ])
    )

    return {
      key,
      name,
      octicon,
      code
    }
  })
  .sort((a, b) => a.key.localeCompare(b.key))

function svgToJSX(node) {
  if (node.type === 'element') {
    const children = node.children.map(svgToJSX)

    if (node.name === 'svg') {
      if (children.length === 0) {
        throw new Error(`No children available for icon`)
      }

      if (children.length > 1) {
        return t.jsxFragment(t.jsxOpeningFragment(), t.jsxClosingFragment(), children)
      }

      return children[0]
    }

    const attrs = Object.entries(node.attributes).map(([key, value]) => {
      if (typeof value !== 'string') {
        throw new Error(`Unknown value type: ${value}`)
      }
      return t.jsxAttribute(t.jsxIdentifier(key), t.stringLiteral(value))
    })
    const openingElement = t.jsxOpeningElement(t.jsxIdentifier(node.name), attrs, children.length === 0)
    const closingElement = t.jsxClosingElement(t.jsxIdentifier(node.name))

    if (children.length > 0) {
      return t.jsxElement(openingElement, closingElement, children, false)
    }

    return t.jsxElement(openingElement, closingElement, [], true)
  }

  throw new Error(`Unknown type: ${node.type}`)
}

function writeIcons(file) {
  const count = icons.length
  const code = `${GENERATED_HEADER}
import React from 'react'
import { createIconComponent } from '../get-svg-props'

${icons.map(({code}) => code).join('\n')}

export {
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

type Size = 'small' | 'medium' | 'large'

interface IconProps {
  'aria-label'?: string
  className?: string
  fill?: string
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
}

type Icon = React.FC<IconProps>

${icons.map(({name}) => `declare const ${name}: Icon`).join('\n')}

export {
  Icon,
  IconProps,
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
