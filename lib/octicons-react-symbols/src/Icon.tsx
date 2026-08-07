import {forwardRef} from 'react'
import type {OcticonReferenceProps} from './types'

const sizeMap = {
  small: 16,
  medium: 32,
  large: 64,
}

type Size = 'small' | 'medium' | 'large'

type IconProps = OcticonReferenceProps & {
  size?: Size | number
  sizes: Readonly<
    Record<
      string,
      {
        readonly id: string
        readonly width: number
      }
    >
  >
}

const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className = '',
    fill = 'currentColor',
    id,
    size = 16,
    sizes,
    style,
    tabIndex,
    title,
    ...rest
  },
  ref,
) {
  const height = typeof size === 'number' ? size : sizeMap[size]
  const heights = Object.keys(sizes)
  const naturalHeight = closestNaturalHeight(heights, height)
  const naturalWidth = sizes[naturalHeight].width
  const width = height * (naturalWidth / naturalHeight)
  const symbolId = sizes[naturalHeight].id
  const labelled = ariaLabel || ariaLabelledBy
  const role = labelled ? 'img' : undefined

  return (
    <svg
      {...rest}
      ref={ref}
      data-component="Octicon"
      aria-hidden={labelled ? undefined : 'true'}
      tabIndex={tabIndex}
      focusable={tabIndex !== undefined && tabIndex >= 0 ? 'true' : 'false'}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      role={role}
      viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
      width={width}
      height={height}
      fill={fill}
      id={id}
      display="inline-block"
      overflow="visible"
      style={{verticalAlign: 'text-bottom', ...style}}
    >
      {title ? <title>{title}</title> : null}
      <use href={`#${symbolId}`} />
    </svg>
  )
})

function closestNaturalHeight(naturalHeights: Array<string>, height: number): number {
  const parsed = naturalHeights.map(naturalHeight => parseInt(naturalHeight, 10))

  return parsed.reduce((acc, naturalHeight) => {
    return naturalHeight <= height ? naturalHeight : acc
  }, parsed[0])
}

export {Icon}
export type {IconProps}
