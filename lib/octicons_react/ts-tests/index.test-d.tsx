import * as React from 'react'
import {
  isOcticon,
  BookmarkFilledIcon,
  GitPullRequestUnlistedIcon,
  MarkGithubIcon,
  PlayIcon,
  PlusIcon,
  RepoDeletedIcon,
  RepoIcon,
  TriangleCircleIcon,
  TriangleFillIcon,
  TriangleIcon,
} from '../src'
import AlertIcon from '../src/__generated__/icons/AlertIcon'
import PlayIconDefault from '../src/__generated__/icons/PlayIcon'

function TestOcticonIdentification({component}: {component: unknown}) {
  if (isOcticon(component)) {
    const Icon = component
    return <Icon size={14} />
  }
  return null
}

function TestOcticons() {
  return (
    <div>
      <MarkGithubIcon />
      <AlertIcon />
      <PlusIcon />
      <RepoIcon size="medium" className="test" aria-label="repo" verticalAlign="middle" />
      <BookmarkFilledIcon size={24} />
      <RepoDeletedIcon size={24} />
      <PlayIcon size={16} />
      <PlayIconDefault size={24} />
      <TriangleIcon size={24} />
      <TriangleCircleIcon size={16} />
      <TriangleFillIcon size={24} />
      <GitPullRequestUnlistedIcon size={16} />
    </div>
  )
}
