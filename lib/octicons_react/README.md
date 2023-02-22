# @primer/octicons-react

[![npm version](https://img.shields.io/npm/v/@primer/octicons-react.svg)](https://www.npmjs.org/package/@primer/octicons-react)

## Install

```shell
npm install @primer/octicons-react
```

## Usage

### Icons

The `@primer/octicons-react` module exports individual icons as [named
exports](https://ponyfoo.com/articles/es6-modules-in-depth#named-exports). This
allows you to import only the icons that you need without blowing up your
bundle:

```jsx
import React from 'react'
import {BeakerIcon, ZapIcon} from '@primer/octicons-react'

export default function Icon({boom}) {
  return boom ? <ZapIcon /> : <BeakerIcon />
}
```

If you were to compile this example with a tool that supports [tree-shaking][]
(such as Webpack, Rollup, or Parcel) the resulting bundle would only include
the "zap" and "beaker" icons.

### Vertical alignment

By default the octicons have `vertical-align: text-bottom;` applied as inline
styles. You can change the alignment via the `verticalAlign` prop, which can be
either `middle`, `text-bottom`, `text-top`, or `top`.

```js
import {RepoIcon} from '@primer/octicons-react'

export default () => (
  <h1>
    <RepoIcon verticalAlign="middle" /> github/github
  </h1>
)
```

### `aria-label`

You have the option of adding accessibility information to the icon with the
[`aria-label` attribute][aria-label] via the `aria-label` prop.

```js
// Example usage
import {PlusIcon} from '@primer/octicons-react'

export default () => (
  <button>
    <PlusIcon aria-label="Add new item" /> New
  </button>
)
```

### `tabIndex`

You can add the `tabindex` attribute to an SVG element via the `tabIndex` prop if the SVG element is intended to be interactive.
`tabIndex` prop also controls the `focusable` attribute of the SVG element which is defined by SVG Tiny 1.2 and only implemented in
Internet Explorer and Microsoft Edge.

If there is no `tabIndex` prop is present (default behavior), it will set the `focusable` attribute to `false`. This is helpful
for preventing the decorative SVG from being announced by some specialized assistive technology browsing modes which can get delayed
while trying to parse the SVG markup.

```js
// Example usage
import {PlusIcon} from '@primer/octicons-react'
export default () => (
  <PlusIcon aria-label="Interactive Plus Icon" tabIndex={0} /> New Item
)
```

### Sizes

The `size` prop takes `small`, `medium`, and `large` values that can be used to
render octicons at standard sizes:

| Prop            | Rendered Size                   |
| :-------------- | :------------------------------ |
| `size='small'`  | 16px height by `computed` width |
| `size='medium'` | 32px height by `computed` width |
| `size='large'`  | 64px height by `computed` width |

```js
// Example usage
import {LogoGithubIcon} from '@primer/octicons-react'

export default () => (
  <h1>
    <a href="https://github.com">
      <LogoGithubIcon size="large" aria-label="GitHub" />
    </a>
  </h1>
)
```

### Fill

The `fill` prop takes a string value that can be used to set the color of the icon.
By default, `fill` is set to [`currentColor`](https://css-tricks.com/currentcolor/).

```js
// Example usage
import {LogoGithub} from '@primer/octicons-react'
export default () => (
  <h1>
    <a href="https://github.com">
      <LogoGithubIcon fill="#f00" />
    </a>
  </h1>
)
```

### `Octicon` (DEPRECATED)

> ⚠️ The `Octicon` component is deprecated. Use icon components on their own instead:
```diff
- <Octicon icon={AlertIcon} />
+ <AlertIcon />
```

The `Octicon` component is wrapper that passes props to its icon component. To render a specific icon, you
can pass it either via the `icon` prop, or as the only child:

```jsx
<Octicon icon={Icon} />
<Octicon><Icon x={10}/></Octicon>
```

[octicons]: https://primer.style/octicons/
[primer]: https://github.com/primer/primer
[docs]: http://primercss.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[tree-shaking]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
[aria-label]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
