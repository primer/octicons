import {Flex, Link, TextInput} from '@primer/components'
import {Container, Head, Header, Hero} from '@primer/gatsby-theme-doctocat'
import {Search} from '@primer/octicons-react'
import React from 'react'
import icons from '../../../lib/build/data.json'
import Icon from '../components/icon'
import useSearch from '../use-search'

export default function IndexPage() {
  const [query, setQuery] = React.useState('')
  const iconsArray = React.useMemo(() => Object.values(icons), [icons])
  const results = useSearch(iconsArray, query, {keys: ['name']})
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Head />
      <Header isSearchEnabled={false} />
      <Hero />
      <Container>
        <TextInput
          icon={Search}
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search icons..."
          width="100%"
          mb={5}
        />
        <Flex flexWrap="wrap" m={-3}>
          {results.map(icon => (
            <Link key={icon.name} display="block" p={3} color="inherit" href={icon.name}>
              <Flex>
                <Icon name={icon.name} />
              </Flex>
            </Link>
          ))}
        </Flex>
      </Container>
    </Flex>
  )
}
