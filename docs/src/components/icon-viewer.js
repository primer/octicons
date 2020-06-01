import {Absolute, BorderBox, Flex, Grid, Relative, theme} from '@primer/components'
import {rgba} from 'polished'
import React from 'react'

export default function IconViewer({children}) {
  const [zoom, setZoom] = React.useState(10)

  return (
    <Relative>
      <BorderBox css={{overflow: 'hidden'}}>
        <Flex
          justifyContent="center"
          alignItems="center"
          height={400}
          css={{
            backgroundImage: `${gridGradient(0, getGridSize(zoom), theme.colors.gray[2])}, ${gridGradient(
              90,
              getGridSize(zoom),
              theme.colors.gray[2]
            )}`,
            backgroundSize: `${getGridSize(zoom)}px ${getGridSize(zoom)}px`,
            backgroundPosition: 'center center'
          }}
        >
          <Flex
            css={{
              transform: `scale(${zoom})`,
              boxShadow: `0 0 0 ${1 / zoom}px ${theme.colors.orange[5]}`
            }}
          >
            {children}
          </Flex>
          <Absolute left={0} right={0} bottom={0}>
            <Grid
              gridGap={2}
              gridTemplateColumns="1fr 48px"
              justifyItems="start"
              alignItems="center"
              width={['100%', '240px']}
              p={3}
            >
              <input
                type="range"
                aria-label="zoom"
                name="zoom"
                min="1"
                max="24"
                step="0.5"
                value={zoom}
                onChange={event => setZoom(parseFloat(event.target.value))}
                css={{width: '100%', padding: 0, margin: 0}}
              />
              <Flex as="span" flexShrink={0}>
                {zoom * 100}%
              </Flex>
            </Grid>
          </Absolute>
        </Flex>
      </BorderBox>
    </Relative>
  )
}

function gridGradient(angle, size, color) {
  // WebKit browsers do not support the "transparent" keyword in gradients.
  // As a workaround, we convert `color` to rgba with an alpha value of 0.
  const tranparent = rgba(color, 0)
  return `linear-gradient(${angle}deg, ${tranparent}, ${tranparent} ${Math.floor(
    size / 2
  )}px, ${color}, ${tranparent} ${Math.floor(size / 2) + 1}px)`
}

function getGridSize(zoom) {
  if (zoom > 8) {
    return zoom
  }

  if (zoom > 4) {
    return zoom * 2
  }

  if (zoom > 2) {
    return zoom * 6
  }

  return zoom * 12
}
