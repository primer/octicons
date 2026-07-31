import React from 'react'
import {Box, Text} from '@primer/components'
import pkg from '../package.json'
// eslint-disable-next-line import/no-namespace
import * as Octicons from '../'

const iconsByName = Octicons

export default function App() {
  const sizes = ['small', 'medium', 'large'] as const
  return (
    <Box p={4}>
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
                <td>
                  {sizes.map(size => (
                    <Text mr={4} key={size}>
                      <Icon size={size} verticalAlign="middle" />
                    </Text>
                  ))}
                </td>
                <td>
                  <pre>
                    {`
import {${iconName}} from '${pkg.name}'
export default () => <${iconName} />
                  `.trim()}
                  </pre>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Box>
  )
}
