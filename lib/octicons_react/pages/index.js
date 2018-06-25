import React from 'react'

import Octicon, {Alert, X, Zap} from '../'
import getIcon from '../icons/all'

export default function App() {
  return (
    <div className='p-4'>
      <table className='data-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th><tt>{'icon={Icon}'}</tt></th>
            <th><tt>{'<Icon />'}</tt></th>
            <th><tt>{"getIcon('name')"}</tt></th>
            <th>medium</th>
            <th>large</th>
            <th>no <tt>{'<Octicon>'}</tt></th>
          </tr>
        </thead>
        <tbody>
          {[[Alert, 'alert'], [X, 'x'], [Zap, 'zap']].map(([Icon, key], i) => (
            <tr key={i}>
              <th>{Icon.name}</th>
              <td>
                <Octicon icon={Icon} />
              </td>
              <td>
                <Octicon><Icon /></Octicon>
              </td>
              <td>
                <Octicon icon={getIcon(key)} />
              </td>
              <td>
                <Octicon size='medium' icon={Icon} />
              </td>
              <td>
                <Octicon size='large' icon={Icon} />
              </td>
              <td>
                <svg width="16" height="16" fill="currentColor"><Icon /></svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
