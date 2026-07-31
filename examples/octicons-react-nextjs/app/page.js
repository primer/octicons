// eslint-disable-next-line import/no-namespace
import * as Octicons from '@primer/octicons-react'

const iconsByName = Octicons
<<<<<<<< HEAD:examples/octicons-react-nextjs/app/index.tsx

export default function App() {
  const sizes = ['small', 'medium', 'large'] as const
========
const sizes = ['small', 'medium', 'large']

export default function Page() {
>>>>>>>> origin/main:examples/octicons-react-nextjs/app/page.js
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
<<<<<<<< HEAD:examples/octicons-react-nextjs/app/index.tsx
                <td>
                  <Text fontFamily="mono" whiteSpace="nowrap">
                    {key}
                  </Text>
                </td>
                <td>
                  <Text fontFamily="mono" whiteSpace="nowrap">
                    {iconName}
                  </Text>
                </td>
========
                <td className="text-mono text-nowrap">{key}</td>
                <td className="text-mono text-nowrap">{iconName}</td>
>>>>>>>> origin/main:examples/octicons-react-nextjs/app/page.js
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
