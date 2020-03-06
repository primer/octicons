import React from 'react'
import icons from '../../../lib/build/data.json'

export default function Icon({name, ...props}) {
  const icon = icons[name]
  return (
    <svg
      width={icon.width}
      height={icon.height}
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      fill="currentColor"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: icon.path}}
      {...props}
    />
  )
}
