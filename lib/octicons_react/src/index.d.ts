// eslint-disable-next-line import/no-namespace
import * as React from 'react'

// eslint-disable-next-line prettier/prettier
import {Icon} from './__generated__/icons.js'

type Size = 'small' | 'medium' | 'large'

export interface OcticonProps extends React.ComponentPropsWithoutRef<'svg'> {
  'aria-label'?: string
  'aria-labelledby'?: string
  tabIndex?: number
  children?: React.ReactElement<any>
  className?: string
  title?: string | React.ReactElement<any>
  id?: string
  fill?: string
  icon?: Icon | React.ReactNode
  size?: number | Size
  /** @deprecated use v-align utilities instead */
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
}

export * from './__generated__/icons.js'
