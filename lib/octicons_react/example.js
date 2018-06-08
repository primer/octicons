import React from 'react'
import ReactDOM from 'react-dom'

import Octicon, {Alert, X, Zap} from './'

function App() {
  return (
    <div className='p-4'>
      {[Alert, X, Zap].map((Icon, i) => (
        <div key={i}>
          <h3 className='f3'>{Icon.name}</h3>
          <p>with <tt>{'icon={Icon}'}</tt>: <Octicon icon={Icon} /></p>
          <p>with <tt>{'<Icon />'}</tt> as child: <Octicon><Icon /></Octicon></p>
          <p>medium: <Octicon size='medium' icon={Icon} /></p>
          <p>large: <Octicon size='large' icon={Icon} /></p>
          <p className='text-red'>without <tt>{'<Octicon>'}</tt>: <svg width="16" height="16" fill="currentColor"><Icon /></svg></p>
        </div>
      ))}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
