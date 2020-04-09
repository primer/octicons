import * as React from 'react'

import {Icon} from './__generated__/icons'

type Size = 'small' | 'medium' | 'large'

export interface OcticonProps {
  ariaLabel?: string
  children?: React.ReactElement<any>
  className?: string
  icon?: Icon
  size?: number | Size
}

declare const Octicon: React.FC<OcticonProps>

export default Octicon

export * from './__generated__/icons'
