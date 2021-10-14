import {Box, Heading, Text, ThemeProvider} from '@primer/components'
import {Container} from '@primer/gatsby-theme-doctocat'
import React from 'react'
import {version} from '../../../../../package.json'

function Hero() {
  return (
    <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
      <Box bg="canvas.default" py={6}>
        <Container>
          <Heading color="accent.fg" fontSize={7} m={0}>
            Octicons
          </Heading>
          <Text as="p" mt={0} mb={3} color="fg.default" fontSize={4}>
            Your project. GitHub's icons.
          </Text>
          <Text as="p" m={0} color="fg.default" fontFamily="mono">
            v{version}
          </Text>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Hero
