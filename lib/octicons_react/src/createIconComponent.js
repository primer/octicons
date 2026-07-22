import React from 'react'
import {renderOcticon} from './renderOcticon'

export function createIconComponent(name, defaultClassName, getSVGData) {
  const svgDataByHeight = getSVGData()
  const heights = Object.keys(svgDataByHeight)

  const Icon = React.forwardRef((props, forwardedRef) =>
    renderOcticon(props, forwardedRef, defaultClassName, svgDataByHeight, heights)
  )

  Icon.displayName = name

  return Icon
}
