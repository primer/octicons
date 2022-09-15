import React from 'react'

const sizeMap = {
  small: 16,
  medium: 32,
  large: 64
}

export default function getSvgProps({
  'aria-label': ariaLabel,
  className,
  fill = 'currentColor',
  size,
  verticalAlign,
  svgDataByHeight
}) {
  const height = sizeMap[size] || size
  const naturalHeight = closestNaturalHeight(Object.keys(svgDataByHeight), height)
  const naturalWidth = svgDataByHeight[naturalHeight].width
  const width = height * (naturalWidth / naturalHeight)
  const path = svgDataByHeight[naturalHeight].path

  return {
    'aria-hidden': ariaLabel ? 'false' : 'true',
    'aria-label': ariaLabel,
    role: 'img',
    className,
    viewBox: `0 0 ${naturalWidth} ${naturalHeight}`,
    width,
    height,
    fill,
    style: {
      display: 'inline-block',
      userSelect: 'none',
      verticalAlign,
      overflow: 'visible'
    },
    dangerouslySetInnerHTML: {__html: path}
  }
}

function closestNaturalHeight(naturalHeights, height) {
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc), naturalHeights[0])
}

export function createIconComponent(name, defaultClassName, svgDataByHeight) {
  const heights = Object.keys(svgDataByHeight)

  function Icon({'aria-label': ariaLabel, className, fill = 'currentColor', size, verticalAlign}) {
    const height = sizeMap[size] || size
    const naturalHeight = closestNaturalHeight(heights, height)
    const naturalWidth = svgDataByHeight[naturalHeight].width
    const width = height * (naturalWidth / naturalHeight)
    const path = svgDataByHeight[naturalHeight].path

    return (
      <svg
        aria-hidden={ariaLabel ? 'false' : 'true'}
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
  Icon.defaultProps = {
    className: defaultClassName,
    size: 16,
    verticalAlign: 'text-bottom'
  }

  return Icon
}
