import * as React from 'react'
import Octicon, {MarkGithubIcon, PlusIcon, RepoIcon} from '../src'

function TestOcticons() {
  return (
    <div>
      <Octicon icon={RepoIcon} size="large" verticalAlign="middle" /> github/github
      <Octicon icon={PlusIcon} aria-label="Add new item" /> New
      <Octicon icon={MarkGithubIcon} size="large" aria-label="GitHub" />
      <Octicon icon={RepoIcon} className="awesomeClassName" />
      <Octicon>
        <RepoIcon />
      </Octicon>
      <Octicon size="large">
        <RepoIcon />
      </Octicon>
      <RepoIcon />
      <RepoIcon size="medium" className="test" aria-label="repo" verticalAlign="middle" />
    </div>
  )
}
