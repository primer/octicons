#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const octicons = require('../../octicons_react')

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

const generatedDir = path.join(__dirname, '../src/__generated__')
const iconsDir = path.join(generatedDir, 'icons')

fs.ensureDirSync(iconsDir)

const icons = Object.keys(octicons).filter(name => name !== 'default')

const initialTypeDefinitions = `${GENERATED_HEADER}
import * as React from 'react'
import * as StyledSystem from 'styled-system'
import {SystemStyleObject} from '@styled-system/css'

type Size = 'small' | 'medium' | 'large'

export interface IconProps extends StyledSystem.ColorProps, StyledSystem.SpaceProps {
  'aria-label'?: string
  className?: string
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
  sx?: SystemStyleObject
}

export type Icon = React.FC<IconProps>
`

fs.writeFileSync(path.join(generatedDir, 'index.js'), '', 'utf-8')
fs.writeFileSync(path.join(generatedDir, 'index.d.ts'), initialTypeDefinitions, 'utf-8')

for (const name of icons) {
  const location = path.join(iconsDir, `${name}.js`)

  const code = `${GENERATED_HEADER}
import styled from 'styled-components'
import * as styledSystem from 'styled-system'
import {${name}} from '../../../../octicons_react/dist/index.esm'
import {COMMON, sx} from '../../utils'

const Styled${name} = styled(${name})(COMMON, sx)

export default Styled${name}
`

  fs.writeFileSync(location, code, 'utf-8')

  console.log('Successfully built', name)

  const exportString = `export { default as ${name} } from './icons/${name}';\r\n`
  fs.appendFileSync(path.join(generatedDir, 'index.js'), exportString, 'utf-8')

  const exportTypeString = `export const ${name}: Icon;\n`
  fs.appendFileSync(path.join(generatedDir, 'index.d.ts'), exportTypeString, 'utf-8')
}
