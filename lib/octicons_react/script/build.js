#!/usr/bin/env node

const octicons = require('../../build/data.json')
const {default: generate} = require('@babel/generator')
const t = require('@babel/types')
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsDir = join(srcDir, 'icons')

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

function pascalCase(str) {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

const icons = Object.entries(octicons)
  .map(([key, octicon]) => {
    const name = `${pascalCase(key)}Icon`
    const heights = Object.keys(octicon.heights)
    // Build an object with the following structure:
    //
    // type SVGData = {
    //   [key in string]: {
    //     width: number,
    //     path: React.JSXElement
    //   },
    // }
    //
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

    // Emit a finished, pre-transformed component instead of a runtime
    // `createIconComponent` factory call. Everything the factory used to do at
    // module-eval time (reading the SVG data, computing the list of heights,
    // wrapping in `forwardRef`) is statically known and emitted directly:
    //
    //   const heights = ["16"]
    //   const svgDataByHeight = { "16": { width: 16, path: <path d="..." /> } }
    //   export const IconName = /*#__PURE__*/ React.forwardRef((props, ref) =>
    //     renderOcticon(props, ref, 'octicon octicon-name', svgDataByHeight, heights)
    //   )
    //   IconName.displayName = "IconName"
    //
    const forwardRefCall = t.addComment(
      t.callExpression(t.memberExpression(t.identifier('React'), t.identifier('forwardRef')), [
        t.arrowFunctionExpression(
          [t.identifier('props'), t.identifier('ref')],
          t.callExpression(t.identifier('renderOcticon'), [
            t.identifier('props'),
            t.identifier('ref'),
            t.stringLiteral(`octicon octicon-${key}`),
            t.identifier('svgDataByHeight'),
            t.identifier('heights')
          ])
        )
      ]),
      'leading',
      '#__PURE__'
    )

    const program = t.program([
      t.importDeclaration([t.importDefaultSpecifier(t.identifier('React'))], t.stringLiteral('react')),
      t.importDeclaration(
        [t.importSpecifier(t.identifier('renderOcticon'), t.identifier('renderOcticon'))],
        t.stringLiteral('../../renderOcticon')
      ),
      t.variableDeclaration('const', [
        t.variableDeclarator(t.identifier('heights'), t.arrayExpression(heights.map(height => t.stringLiteral(height))))
      ]),
      t.variableDeclaration('const', [t.variableDeclarator(t.identifier('svgDataByHeight'), svgData)]),
      t.exportNamedDeclaration(
        t.variableDeclaration('const', [t.variableDeclarator(t.identifier(name), forwardRefCall)])
      ),
      t.expressionStatement(
        t.assignmentExpression(
          '=',
          t.memberExpression(t.identifier(name), t.identifier('displayName')),
          t.stringLiteral(name)
        )
      )
    ])

    const {code} = generate(program)

    return {
      key,
      name,
      octicon,
      code: `${GENERATED_HEADER}\n${code}\n`
    }
  })
  .sort((a, b) => a.key.localeCompare(b.key))

function writeIcons() {
  const count = icons.length

  // One module per icon so consumers can codesplit / dynamically import icons.
  const iconWrites = icons.map(({name, code}) => fse.writeFile(join(iconsDir, `${name}.js`), code, 'utf8'))

  // A pure re-export barrel. Combined with `"sideEffects": false` and the
  // `/*#__PURE__*/`-annotated per-icon modules, static named imports
  // (`import {AlertIcon}`) tree-shake down to a single icon.
  const barrel = `${GENERATED_HEADER}
${icons.map(({name}) => `export {${name}} from './${name}'`).join('\n')}
`

  return Promise.all([...iconWrites, fse.writeFile(join(iconsDir, 'index.js'), barrel, 'utf8')]).then(() => {
    console.warn('wrote %d icon modules + barrel to %s', count, iconsDir)
    return icons
  })
}

function writeTypes() {
  const count = icons.length

  // Shared types, imported by each per-icon declaration file.
  const sharedTypes = `${GENERATED_HEADER}
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

export {Icon, IconProps}
`

  // Per-icon declaration file so subpath imports (`import('.../AlertIcon')`)
  // resolve their own types.
  const typeWrites = icons.map(({name}) => {
    const dts = `${GENERATED_HEADER}
import {Icon} from './types'

declare const ${name}: Icon

export {${name}}
`
    return fse.writeFile(join(iconsDir, `${name}.d.ts`), dts, 'utf8')
  })

  const barrel = `${GENERATED_HEADER}
export {Icon, IconProps} from './types'
${icons.map(({name}) => `export {${name}} from './${name}'`).join('\n')}
`

  return Promise.all([
    fse.writeFile(join(iconsDir, 'types.d.ts'), sharedTypes, 'utf8'),
    ...typeWrites,
    fse.writeFile(join(iconsDir, 'index.d.ts'), barrel, 'utf8')
  ]).then(() => {
    console.warn('wrote %d icon type modules + barrel to %s', count, iconsDir)
    return icons
  })
}

fse
  .emptyDir(iconsDir)
  .then(() => writeIcons())
  .then(() => writeTypes())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

/**
 * Convert a given node from an svg AST into a JS AST of JSX Elements
 */
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
