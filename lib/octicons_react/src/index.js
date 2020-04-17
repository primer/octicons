import React from 'react'

export default function Octicon({icon: Icon, children, ...props}) {
  return typeof Icon === 'function' ? <Icon {...props} /> : React.cloneElement(React.Children.only(children), props)
}

export * from './__generated__/icons'
