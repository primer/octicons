import * as React from 'react'

import {Icon} from './__generated__/icons'

type Size = 'small' | 'medium' | 'large'
export interface OcticonProps {
  ariaLabel?: string
  children?: React.ReactElement<any>
  className?: string
  height?: number
  icon: Icon
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
  width?: number
}

declare const Octicon: React.SFC<OcticonProps>
export default Octicon

export function createIcon<C extends React.SFC<{}>, W extends number, H extends number>(
  component: C,
  size: [W, H]
): Icon<W, H>

export * from './__generated__/icons'
