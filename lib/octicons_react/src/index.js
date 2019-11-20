import React from 'react'
import PropTypes from 'prop-types'

const sizeMap = {
  small: 16,
  medium: 32,
  large: 64
}

const alignMap = {
  top: 'text-top',
  middle: 'middle'
}

const defaultSize = [16, 16]

export default function Octicon(props) {
  const {ariaLabel, children, className, height, icon: Icon, size, verticalAlign, width} = props

  const child = typeof Icon === 'function' ? <Icon /> : React.Children.only(children)

  const widthHeight = child.type.size || defaultSize

  const attrs = {
    'aria-hidden': ariaLabel ? 'false' : 'true',
    'aria-label': ariaLabel,
    className,
    height,
    role: 'img',
    viewBox: [0, 0, ...widthHeight].join(' ')
  }

  if (width && height) {
    Object.assign(attrs, {width, height})
  } else {
    const dims = {width: widthHeight[0], height: widthHeight[1]}
    const given = width ? 'width' : 'height'
    const computed = given === 'width' ? 'height' : 'width'
    attrs[given] = width || height || sizeMap[size] || size
    attrs[computed] = attrs[given] * (dims[computed] / dims[given])
  }

  attrs.style = {
    display: 'inline-block',
    fill: 'currentColor',
    userSelect: 'none',
    verticalAlign: alignMap[verticalAlign] || verticalAlign
  }

  return <svg {...attrs}>{child}</svg>
}

Octicon.defaultProps = {
  className: 'octicon',
  size: 16,
  verticalAlign: 'text-bottom'
}

Octicon.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.element,
  height: PropTypes.number,
  icon: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.keys(sizeMap))]),
  verticalAlign: PropTypes.oneOf(['middle', 'text-bottom', 'text-top', 'top', 'unset']),
  width: PropTypes.number
}

// Helper since TS makes this painful
export function createIcon(component, size) {
  component.size = size
  return component
}

export * from './__generated__/icons'
