import * as React from 'react'

import {Icon} from './__generated__/icons'

type Size = 'small' | 'medium' | 'large'
interface OcticonProps {
  ariaLabel?: string
  children?: React.ReactElement<any>
  height?: number
  icon: Icon
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top'
  width?: number
}
declare const Octicon: React.SFC<OcticonProps>
export default Octicon
export * from './__generated__/icons'
