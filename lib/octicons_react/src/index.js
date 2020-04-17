import React from 'react'

export default function Octicon({icon: Icon, children, ...props}) {
  // eslint-disable-next-line no-console
  console.warn(
    // eslint-disable-next-line github/unescaped-html-literal
    '<Octicon> is deprecated. Use icon components on their own instead (e.g. <Octicon icon={AlertIcon} /> → <AlertIcon />)'
  )
  return typeof Icon === 'function' ? <Icon {...props} /> : React.cloneElement(React.Children.only(children), props)
}

export * from './__generated__/icons'
