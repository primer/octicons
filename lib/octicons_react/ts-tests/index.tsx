import * as React from 'react'
import Octicon, {getIconByName, iconsByName, MarkGithub, OcticonProps, Plus, Repo} from '../src'

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
      <Octicon icon={Repo} size="large" verticalAlign="middle" /> github/github
      <Octicon icon={Plus} ariaLabel="Add new item" /> New
      <Octicon icon={MarkGithub} size="large" ariaLabel="GitHub" />
      <Octicon icon={Repo} className="awesomeClassName" />
      <Octicon>
        <Repo />
      </Octicon>
      <Octicon size="large">
        <Repo />
      </Octicon>
      <Repo />
      <Repo size="medium" className="test" ariaLabel="repo" verticalAlign="middle" />
    </div>
  )
}
