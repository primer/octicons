import * as React from 'react'
import {RepoIcon} from '../src/__generated__'

function TestOcticons() {
  return (
    <div>
      <RepoIcon />
      <RepoIcon size="medium" className="test" aria-label="repo" verticalAlign="middle" />
      <RepoIcon color="red" />
      <RepoIcon m={3} ml={1} mr={2} mt={3} mb={4} />
    </div>
  )
}
