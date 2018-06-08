import React from 'react'
import PropTypes from 'prop-types'

const sizeMap = {
  medium: 32,
  large: 64
}

const alignMap = {
  top: 'text-top',
  middle: 'middle'
}

export default function Octicon(props) {
  const {
    ariaLabel,
    children,
    icon,
    size,
    verticalAlign,
    ...rest
  } = props

  const child = (typeof icon === 'function')
    ? <icon />
    : React.Children.only(children)

  const [width, height] = child.type.size || [16, 16]
  const attrs = {
    ariaLabel,
    role: 'img',
    height: height
  }

  if (size in sizeMap) {
    attrs.height = sizeMap[size]
  }

  attrs.width = attrs.height * width / height

  const alignment = alignMap[verticalAlign] || 'text-bottom'

  attrs.style = {
    display: 'inline-block',
    fill: 'currentColor',
    verticalAlign: alignment
  }

  return <svg {...attrs}>{child}</svg>
}

Octicon.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.element,
  icon: PropTypes.func,
  size: PropTypes.oneOf(['medium', 'large']),
  verticalAlign: PropTypes.oneOf([
    'middle', 'text-bottom', 'text-top', 'top'
  ])
}
