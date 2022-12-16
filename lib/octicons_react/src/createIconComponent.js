import React from 'react'

const sizeMap = {
  small: 16,
  medium: 32,
  large: 64
}

export function createIconComponent(name, defaultClassName, getSVGData) {
  const svgDataByHeight = getSVGData()
  const heights = Object.keys(svgDataByHeight)

  function Icon({
    'aria-label': ariaLabel,
    tabIndex,
    className = defaultClassName,
    fill = 'currentColor',
    size = 16,
    verticalAlign = 'text-bottom'
  }) {
    const height = sizeMap[size] || size
    const naturalHeight = closestNaturalHeight(heights, height)
    const naturalWidth = svgDataByHeight[naturalHeight].width
    const width = height * (naturalWidth / naturalHeight)
    const path = svgDataByHeight[naturalHeight].path

    return (
      <svg
        aria-hidden={ariaLabel ? 'false' : 'true'}
        tabIndex={tabIndex}
        focusable={tabIndex >= 0 ? 'true' : 'false'}
        aria-label={ariaLabel}
        role="img"
        className={className}
        viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
        width={width}
        height={height}
        fill={fill}
        style={{
          display: 'inline-block',
          userSelect: 'none',
          verticalAlign,
          overflow: 'visible'
        }}
      >
        {path}
      </svg>
    )
  }

  Icon.displayName = name

  return Icon
}

function closestNaturalHeight(naturalHeights, height) {
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc), naturalHeights[0])
}
