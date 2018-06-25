# GitHub Octicons React Component

[![npm version](https://img.shields.io/npm/v/%40github%2Focticons-react.svg)](https://www.npmjs.org/package/%40github%2Focticons-react)
[![Build Status](https://travis-ci.org/primer/octicons.svg?branch=master)](https://travis-ci.org/primer/octicons)

> A react component for installing octicons

## Install

```
$ npm install @github/octicons-react --save
```

## Usage

### `<Octicon>`
The `<Octicon>` component is really just the "shell" of an octicon which
handles the `<svg>` element and all of its attributes. To render a specific
icon, you must pass it either via `icon` prop or as a child:

```jsx
// icon prop (function)
<Octicon icon={Icon} />
// icon prop (element)
<Octicon icon={<Icon/>} />
// child
<Octicon><Icon/></Octicon>
```

### Icons
The `@github/octicons-react` ES6 module exports the `Octicon` component as
`default` and the individual icon symbols as separate [named
exports](https://ponyfoo.com/articles/es6-modules-in-depth#named-exports). This
allows you to import only the icons that you need without blowing up your
bundle:

```jsx
import React from 'react'
import Octicon, {Beaker, Zap} from '@github/octicons-react'

export default function Icon({boom}) {
  return <Octicon icon={boom ? Zap : Beaker}/>
}
```

If you were to compile this example with a tool that supports [tree-shaking],
the resulting bundle would only include the "zap" and "beaker" icons.

### All icons
If you don't mind your bundle being huge or you need to be able to render
arbitrarily named icons at runtime, there's a special `icons/all` entry which
provides you with two ways to get any icon:

#### `getIconByName()`
The default export of `@github/octicons-react/icons/all` is a function that
takes a lowercase octicon name (such as `arrow-right`) and returns the
corresponding icon class. Using this helper, it's possible to create an Octicon
class that takes a `name` prop and resolves it to the right component:

```jsx
import React from 'react'
import Octicon from '@github/octicons-react'
import getIcon from '@github/octicons-react/icons/all'

export default function OcticonByName({name, ...props}) {
  return <Octicon {...props} icon={getIcon(name)} />
}
```

`@github/octicons-react/icons/all` also exports a `iconsByName` object that
maps keys (such as `arrow-right`) to component functions, which you can use to
generate listings of all the octicons:

```jsx
import React from 'react'
import Octicon from '@github/octicons-react'
import {iconsByName} from '@github/octicons-react/icons/all'

export default function OcticonsList() {
  return (
    <ul>
      {Object.keys(iconsByName).map(key => (
        <li key={key}>
          <tt>{key}</tt>
          <Octicon icon={iconsByName[key]}/>
        </li>
      ))}
    </ul>
  )
}
```

### Alignment

By default the octicons have `vertical-align: text-bottom;` applied to them. But there are cases where you'll want to change the alignment. The props available are `top`, `middle`.

```js
// Example usage
import Octicon from "@github/octicons-react"

export default () => (
  <h1>
    <Octicon name="repo" large middle /> github/github
  </h1>
)
```


### ariaLabel

You have the option to add accessibility information to the icon using `aria-label`.

```js
// Example usage
import Octicon from "@github/octicons-react"

export default () => (
  <button>
    <Octicon name="plus" ariaLabel="Add new item" /> New
  </button>
)
```


### Sizes

The properties `large`, `medium`, `small` are available for setting the size of the icon.

| Prop | Rendered Size |
| :- | :- |
| Small | 16px height by `computed` width |
| Medium | 32px height by `computed` width |
| Large | 64px height by `computed` width |

```js
// Example usage
import Octicon from "@github/octicons-react"

export default () => (
  <h1>
    <a href="https://github.com">
      <Octicon name="logo-github" large ariaLabel="GitHub"/>
    </a>
  </h1>
)
```

## License

(c) GitHub, Inc.

When using the GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).

[MIT](./LICENSE)  

[octicons]: https://octicons.github.com/
[primer]: https://github.com/primer/primer
[docs]: http://primercss.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[tree-shaking]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
