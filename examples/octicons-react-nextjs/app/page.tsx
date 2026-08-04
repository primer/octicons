// eslint-disable-next-line import/no-namespace
import * as Octicons from '@primer/octicons-react'

const iconsByName = Octicons
const sizes = ['small', 'medium', 'large']

export default function Page() {
  return (
    <main className="p-4">
      <table className="data-table">
        <thead>
          <tr>
            <th>key</th>
            <th>import</th>
            <th>small, medium, large</th>
            <th>code sample</th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(iconsByName) as Array<keyof typeof iconsByName>).map(key => {
            const Icon = iconsByName[key]
            const iconName = Icon.displayName || key
            return (
              <tr key={key}>
                <td className="text-mono text-nowrap">{key}</td>
                <td className="text-mono text-nowrap">{iconName}</td>
                <td>
                  {sizes.map(size => (
                    <span className="mr-4" key={size}>
                      <Icon size={size} verticalAlign="middle" />
                    </span>
                  ))}
                </td>
                <td>
                  <pre>
                    {`
import {${iconName}} from '@primer/octicons-react'
export default () => <${iconName} />
                    `.trim()}
                  </pre>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
