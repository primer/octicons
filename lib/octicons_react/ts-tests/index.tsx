import * as React from 'react'
import Octicon, {getIconByName, iconsByName, MarkGithubIcon, OcticonProps, PlusIcon, RepoIcon} from '../src'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

function OcticonByName({name, ...props}: {name: keyof iconsByName} & Omit<OcticonProps, 'icon'>): React.ReactElement {
  return <Octicon {...props} icon={getIconByName(name)} />
}

function TestOcticonsByName(): React.ReactElement {
  return <OcticonByName name="x" />
}

// Unfortunately, `Object.keys` returns `string[]` unconditionally;
// see https://github.com/Microsoft/TypeScript/pull/13971 &
// https://github.com/Microsoft/TypeScript/issues/12870 for details.
function keys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

function OcticonsList() {
  return (
    <ul>
      {keys(iconsByName).map(key => (
        <li key={key}>
          <code>{key}</code>
          <Octicon icon={iconsByName[key]} />
        </li>
      ))}
    </ul>
  )
}

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
      <RepoIcon size="medium" className="test" ariaLabel="repo" verticalAlign="middle" />
    </div>
  )
}
