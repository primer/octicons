import * as React from 'react'
import {MarkGithubIcon, PlusIcon, RepoIcon} from '../src'

function TestOcticons() {
  return (
    <div>
      <MarkGithubIcon />
      <PlusIcon />
      <RepoIcon size="medium" className="test" aria-label="repo" verticalAlign="middle" />
    </div>
  )
}
