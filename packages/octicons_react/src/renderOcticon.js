import React from 'react'

const sizeMap = {
  small: 16,
  medium: 32,
  large: 64
}

// Shared render runtime for every generated icon. Extracting this from
// `createIconComponent` lets the generated icons ship as finished
// `React.forwardRef` components instead of runtime factory calls, while the
// size/`viewBox`/`closestNaturalHeight` math that depends on the runtime `size`
// prop stays here.
export function renderOcticon(
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
  forwardedRef,
  defaultClassName,
  svgDataByHeight,
  heights
) {
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
      data-component="Octicon"
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

function closestNaturalHeight(naturalHeights, height) {
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc), naturalHeights[0])
}
