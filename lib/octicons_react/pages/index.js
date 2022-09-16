import React from 'react'
import {Box, Text} from '@primer/components'
import pkg from '../package.json'
// eslint-disable-next-line import/no-namespace
import * as Octicons from '../'

// eslint-disable-next-line no-unused-vars
const {default: _Octicon, ...iconsByName} = Octicons

export default function App() {
  const sizes = ['small', 'medium', 'large']
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
import Octicon, {${Icon.name}} from '${pkg.name}'
export default () => <${Icon.name} />
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
