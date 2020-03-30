import {Flex, Link, TextInput} from '@primer/components'
import {Search} from '@primer/octicons-react'
import React from 'react'
import icons from '../../../lib/build/data.json'
import useSearch from '../use-search'
import Icon from './icon'

export default function Icons() {
  const [query, setQuery] = React.useState('')
  const iconsArray = React.useMemo(() => Object.values(icons), [icons])
  const results = useSearch(iconsArray, query, {keys: ['name']})
  return (
    <>
      <TextInput
        icon={Search}
        aria-label="Search"
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
    </>
  )
}
