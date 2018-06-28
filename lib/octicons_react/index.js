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
  const {ariaLabel, children, className = 'octicon', icon: Icon, size, verticalAlign} = props

  const child = typeof Icon === 'function' ? <Icon /> : React.Children.only(children)

  const [width, height] = child.type.size || defaultSize
  const attrs = {
    'aria-hidden': 'true',
    'aria-label': ariaLabel,
    className,
    height,
    role: 'img',
    viewBox: [0, 0, width, height].join(' ')
  }

  if (size in sizeMap) {
    attrs.height = sizeMap[size]
  }

  attrs.width = (attrs.height * width) / height

  attrs.style = {
    display: 'inline-block',
    fill: 'currentColor',
    userSelect: 'none',
    verticalAlign: alignMap[verticalAlign] || verticalAlign
  }

  return <svg {...attrs}>{child}</svg>
}

Octicon.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.element,
  icon: PropTypes.func,
  // TODO: support size as a number
  size: PropTypes.oneOf(Object.keys(sizeMap)),
  verticalAlign: PropTypes.oneOf(['middle', 'text-bottom', 'text-top', 'top'])
}

// this exports all of the icon classes as named exports, which can be
// tree-shaken by tools such as webpack, rollup, etc.
export * from './icons'
