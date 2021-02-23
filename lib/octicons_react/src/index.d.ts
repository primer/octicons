import * as React from 'react'

import {Icon} from './__generated__/icons'

type Size = 'small' | 'medium' | 'large'

export interface OcticonProps {
  'aria-label'?: string
  children?: React.ReactElement<any>
  className?: string
  fill?: string
  icon?: Icon
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
}

/**
 * @deprecated Use icon components on their own instead (e.g. `<Octicon icon={AlertIcon} />` → `<AlertIcon />`)
 */
declare const Octicon: React.FC<OcticonProps>

export default Octicon

export * from './__generated__/icons'
