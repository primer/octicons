import * as React from 'react'

import {Icon} from './__generated__/icons'

type Size = 'small' | 'medium' | 'large'

export interface OcticonProps {
  'aria-label'?: string
  tabIndex?: number
  children?: React.ReactElement<any>
  className?: string
  fill?: string
  icon?: Icon
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
}

export * from './__generated__/icons'
