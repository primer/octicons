#!/usr/bin/env node
const iconComponents = require('../../octicons_react')
const fse = require('fs-extra')
const {join, resolve} = require('path')

const srcDir = resolve(__dirname, '../src/__generated__')
const iconsFile = join(srcDir, 'index.js')
const typesFile = join(srcDir, 'index.d.ts')

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

const icons = Object.keys(iconComponents)
  .filter(name => name !== 'default')
  .map(name => {
    const code = `export const ${name} = styled(Icon.${name})(COMMON)
${name}.propTypes = COMMON.propTypes
`
    return {name, code}
  })
  .sort((a, b) => a.name.localeCompare(b.name))

function writeIcons(file) {
  const count = icons.length
  const code = `${GENERATED_HEADER}
import styled from 'styled-components'
import * as styledSystem from 'styled-system'
import systemPropTypes from '@styled-system/prop-types'
import * as Icon from '../../../octicons_react/dist/index.esm'

const COMMON = styledSystem.compose(styledSystem.space, styledSystem.color)

COMMON.propTypes = {
  ...systemPropTypes.space,
  ...systemPropTypes.color
}

${icons.map(({code}) => code).join('\n')}`

  return fse.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s with %d exports', file, count)
    return icons
  })
}

function writeTypes(file) {
  const count = icons.length
  const code = `${GENERATED_HEADER}
import * as React from 'react'
import * as StyledSystem from 'styled-system'

type Size = 'small' | 'medium' | 'large'

interface IconProps extends StyledSystem.ColorProps, StyledSystem.SpaceProps {
  'aria-label'?: string
  className?: string
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
