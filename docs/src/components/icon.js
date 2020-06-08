import React from 'react'

export default function Icon({width, height, path, ...props}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: path}}
      style={{
        display: 'inline-block',
        verticalAlign: 'text-bottom'
      }}
      {...props}
    />
  )
}
