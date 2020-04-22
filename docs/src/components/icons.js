import {Box, Flex, Grid, Heading, Link, Text, TextInput} from '@primer/components'
import {Search} from '@primer/octicons-react'
import {Link as GatsbyLink} from 'gatsby'
import flatMap from 'lodash.flatmap'
import groupBy from 'lodash.groupby'
import React from 'react'
import icons from '../../../lib/build/data.json'
import useSearch from '../use-search'
import Icon from './icon'

export default function Icons() {
  const [query, setQuery] = React.useState('')
  const iconsArray = React.useMemo(
    () => {
      return flatMap(Object.values(icons), icon => {
        return Object.entries(icon.heights).map(([height, value]) => ({
          name: icon.name,
          keywords: icon.keywords,
          width: value.width,
          height,
          path: value.path
        }))
      })
    },
    [icons]
  )
  const results = useSearch(iconsArray, query, {keys: ['name']})
  const iconsByHeight = React.useMemo(() => groupBy(results, 'height'), [results])
  return (
    <Grid gridGap={5}>
      <TextInput
        icon={Search}
        aria-label="Search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Search icons..."
        width="100%"
      />
      {Object.entries(iconsByHeight).length > 0 ? (
        Object.entries(iconsByHeight).map(([height, icons]) => (
          <Box key={height}>
            <Heading as="h2" fontSize={3} mb={3}>
              {height}
              px
            </Heading>
            <Flex flexWrap="wrap" mx={-3}>
              {icons.map(icon => (
                <Link
                  as={GatsbyLink}
                  key={`${icon.name}-${icon.height}`}
                  display="block"
                  p={3}
                  color="inherit"
                  to={`/${icon.name}-${icon.height}`}
                >
                  <Flex>
                    <Icon width={icon.width} height={icon.height} path={icon.path} />
                  </Flex>
                </Link>
              ))}
            </Flex>
          </Box>
        ))
      ) : (
        <Text textAlign="center" p={3}>
          No results found
        </Text>
      )}
    </Grid>
  )
}
