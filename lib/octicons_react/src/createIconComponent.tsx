import React from 'react'
import {renderOcticon, type IconProps, type SVGData} from './renderOcticon'

export function createIconComponent(name: string, defaultClassName: string, getSVGData: () => SVGData) {
  const svgDataByHeight = getSVGData()
  const heights = Object.keys(svgDataByHeight)

  const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) =>
    renderOcticon(props, forwardedRef, defaultClassName, svgDataByHeight, heights),
  )

  Icon.displayName = name

  return Icon
}
