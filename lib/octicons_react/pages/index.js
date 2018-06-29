import React from 'react'

import Octicon, {iconsByName} from '../'

export default function App() {
  const sizes = ['small', 'medium', 'large']
  return (
    <div className='p-4'>
      <table className='data-table'>
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
                <td><tt className='no-wrap'>{key}</tt></td>
                <td><tt className='no-wrap'>{Icon.name}</tt></td>
                <td>
                  {sizes.map(size => (
                    <span className='mr-4' key={size}>
                      <Octicon icon={Icon} size={size} verticalAlign='middle' />
                    </span>
                  ))}
                </td>
                <td>
                  <pre>{`
import Octicon, {${Icon.name}} from '@github/octicons-react'
export default () => <Octicon icon={${Icon.name}} />
                  `.trim()}</pre>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
