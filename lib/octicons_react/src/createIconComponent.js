import React from 'react'

const sizeMap = {
  small: 16,
  medium: 32,
  large: 64
}

export function createIconComponent(name, defaultClassName, getSVGData) {
  const svgDataByHeight = getSVGData()
  const heights = Object.keys(svgDataByHeight)

  const Icon = React.forwardRef(
    (
      {
        'aria-label': ariaLabel,
        'aria-labelledby': arialabelledby,
        tabIndex,
        className = '',
        fill = 'currentColor',
        size = 16,
        verticalAlign = 'text-bottom',
        id,
        title,
        style,
        ...rest
      },
      forwardedRef
    ) => {
      const height = sizeMap[size] || size
      const naturalHeight = closestNaturalHeight(heights, height)
      const naturalWidth = svgDataByHeight[naturalHeight].width
      const width = height * (naturalWidth / naturalHeight)
      const path = svgDataByHeight[naturalHeight].path
      const labelled = ariaLabel || arialabelledby
      const role = labelled ? 'img' : undefined

      return (
        <svg
          ref={forwardedRef}
          {...rest}
          aria-hidden={labelled ? undefined : 'true'}
          tabIndex={tabIndex}
          focusable={tabIndex >= 0 ? 'true' : 'false'}
          aria-label={ariaLabel}
          aria-labelledby={arialabelledby}
          className={`${defaultClassName} ${className}`.trim()}
          role={role}
          viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
          width={width}
          height={height}
          fill={fill}
          id={id}
          display="inline-block"
          overflow="visible"
          style={{
            verticalAlign,
            ...style
          }}
        >
          {title ? <title>{title}</title> : null}
          {path}
        </svg>
      )
    }
  )

  Icon.displayName = name

  return Icon
}

function closestNaturalHeight(naturalHeights, height) {
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc), naturalHeights[0])
}
