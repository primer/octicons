import React from 'react'

import Octicon, {iconsByName} from '../'
import {Block, Text} from 'primer-react'

export default function App() {
  const sizes = ['small', 'medium', 'large']
  return (
    <Block p={4}>
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
                      <Octicon icon={Icon} size={size} verticalAlign="middle" />
                    </Text>
                  ))}
                </td>
                <td>
                  <pre>
                    {`
import Octicon, {${Icon.name}} from '@github/octicons-react'
export default () => <Octicon icon={${Icon.name}} />
                  `.trim()}
                  </pre>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Block>
  )
}
