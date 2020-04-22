import {Box, Heading, Text} from '@primer/components'
import {Container} from '@primer/gatsby-theme-doctocat'
import React from 'react'
import {version} from '../../../../../package.json'

function Hero() {
  return (
    <Box bg="black" py={6}>
      <Container>
        <Heading color="blue.4" fontSize={7} m={0}>
          Octicons
        </Heading>
        <Text as="p" mt={0} mb={3} color="blue.2" fontSize={4}>
          Your project. GitHub's icons.
        </Text>
        <Text as="p" m={0} color="blue.3" fontFamily="mono">
          v{version}
        </Text>
      </Container>
    </Box>
  )
}

export default Hero
