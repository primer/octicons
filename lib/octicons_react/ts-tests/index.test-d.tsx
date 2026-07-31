import * as React from 'react'
import {MarkGithubIcon, PlusIcon, RepoIcon} from '../src'
import AlertIcon from '../src/__generated__/icons/AlertIcon'

function TestOcticons() {
  return (
    <div>
      <MarkGithubIcon />
      <AlertIcon />
      <PlusIcon />
      <RepoIcon size="medium" className="test" aria-label="repo" verticalAlign="middle" />
    </div>
  )
}
