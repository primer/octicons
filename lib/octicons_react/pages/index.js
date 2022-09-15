import React from 'react'
import {Box, Text} from '@primer/components'
import pkg from '../package.json'
import * as Octicons from '../'

const {default: Octicon, ...iconsByName} = Octicons

export default function App() {
  const sizes = ['small', 'medium', 'large']
  return (
    <Box p={4}>
      <table className="data-table">
        <thead>
          <tr>
            <th>key</th>
            <th>import</th>
            <th>small</th>
            <th>medium</th>
            <th>large</th>
            <th>code sample</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(iconsByName).map(key => {
            const Icon = iconsByName[key]
            return (
              <tr key={key}>
                <td>
                  <Text mono nowrap>
                    {key}
                  </Text>
                </td>
                <td>
                  <Text mono nowrap>
                    {Icon.name}
                  </Text>
                </td>
                {sizes.map(size => (
                  <td key={size}>
                    <Text mr={4}>
                      <Icon size={size} verticalAlign="middle" />
                    </Text>
                  </td>
                ))}
                <td>
                  <pre>
                    {`
import {${key}} from '${pkg.name}'
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
