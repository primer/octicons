import * as React from 'react'
import Octicon, {
  OcticonProps,
  Beaker,
  Zap,
  Repo,
  Plus,
  LogoGithub,
  getIconByName,
  iconsByName,
  createIcon
} from '../src'

function Icon({boom}: {boom: boolean}): React.ReactNode {
  return <Octicon icon={boom ? Zap : Beaker} />
}

function OcticonByName({name, ...props}: {name: keyof iconsByName} & OcticonProps): React.ReactNode {
  return <Octicon {...props} icon={getIconByName(name)} />
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

function VerticalAlign() {
  return (
    <h1>
      <Octicon icon={Repo} size="large" verticalAlign="middle" /> github/github
      <Octicon icon={Plus} ariaLabel="Add new item" /> New
      <Octicon icon={LogoGithub} size="large" ariaLabel="GitHub" />
    </h1>
  )
}

function WithClassName() {
  return (
    <Octicon icon={Repo} className="awesomeClassName" />
  )
}

const CirclesIcon = createIcon(
  () => {
    return (
      <React.Fragment>
        <circle r={5} cx={5} cy={5} />
        <circle r={5} cx={15} cy={5} />
        <circle r={5} cx={25} cy={5} />
      </React.Fragment>
    )
  },
  [30, 10]
)

export function CirclesOcticon(props: OcticonProps) {
  return <Octicon {...props} icon={CirclesIcon} />
}
