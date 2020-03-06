import Fuse from 'fuse.js'
import React from 'react'

export default function useSearch(list, query, options) {
  const [results, setResults] = React.useState(list)

  const fuse = React.useMemo(
    () =>
      new Fuse(list, {
        threshold: 0.2,
        ...options
      }),
    [list]
  )

  React.useEffect(
    () => {
      if (query.trim()) {
        setResults(fuse.search(query.trim()))
      } else {
        setResults(list)
      }
    },
    [fuse, list, query]
  )

  return results
}
