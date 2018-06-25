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
<Octicon icon={<Icon />} />
// child
<Octicon><Icon/></Octicon>
```

### Icons
In order to avoid bloating builds, the `@github/octicons-react` ES6 module
exports the `Octicon` component as `default`, and the individual icon symbols
as separate [named exports]. This means that you have to import only the icons
that you need:

```jsx
import Octicon, {Beaker, Zap} from '@github/octicons-react'

module.exports = ({boom}) => <Octicon icon={boom ? Zap : Beaker} />
```

### Alignment

By default the octicons have `vertical-align: text-bottom;` applied to them. But there are cases where you'll want to change the alignment. The props available are `top`, `middle`.

```js
// Example usage
import Octicon from "@github/octicons-react"

return (
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

return (
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

return (
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
