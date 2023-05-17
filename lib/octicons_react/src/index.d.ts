// eslint-disable-next-line import/no-namespace
import * as React from 'react'

// eslint-disable-next-line prettier/prettier
import { Icon } from './__generated__/icons'

type Size = 'small' | 'medium' | 'large'

export interface OcticonProps {
  'aria-label'?: string
  'aria-labelby'?: string
  tabIndex?: number
  children?: React.ReactElement<any>
  className?: string
  title?: string | React.ReactElement<any>
  id?: string
  fill?: string
  icon?: Icon | React.SVGAttributes<SVGElement>
  size?: number | Size
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
}

/**
 * @deprecated Use icon components on their own instead (e.g. `<Octicon icon={AlertIcon} />` → `<AlertIcon />`)
 */
declare const Octicon: React.FC<OcticonProps>

export default Octicon

export * from './__generated__/icons'
