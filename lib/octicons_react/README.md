# [Octicons] for React

[![npm version](https://img.shields.io/npm/v/@primer/octicons-react.svg)](https://www.npmjs.org/package/@primer/octicons-react)

## Install

```
$ npm install @primer/octicons-react --save
```

## Usage

### Icons
The `@primer/octicons-react` module exports the individual icon components as separate files. This allows you to import only the icons that you need without blowing up your
bundle:

```jsx
import React from 'react'
import Beaker from '@primer/octicons-react/icons/Beaker';
import Zap from '@primer/octicons-react/icons/Zap';

export default function Icon({boom}) {
  return boom ? <Zap /> : <Beaker />
}
```

### `<Octicon>`
The `<Octicon>` component is exported as `default` from `@primer/octicons-react` and is really just the "shell" of an Octicon that renders the `<svg>` element and all of its attributes. Note that all icons are automatically wrapped in this component.

### Vertical alignment
By default the octicons have `vertical-align: text-bottom;` applied as inline
styles. You can change the alignment via the `verticalAlign` prop, which can be
either `middle`, `text-bottom`, `text-top`, or `top`.

```js
import Repo from '@primer/octicons-react/icons/Repo'

export default () => (
  <h1>
    <Repo size='large' verticalAlign='middle' /> github/github
  </h1>
)
```


### `ariaLabel`
You have the option of adding accessibility information to the icon with the
[`aria-label` attribute][aria-label] via the `ariaLabel` prop (note the
capitalization of `L`!).

```js
// Example usage
import Plus from '@primer/octicons-react/icons/Plus'

export default () => (
  <button>
    <Plus ariaLabel="Add new item" /> New
  </button>
)
```


### Sizes
The `size` prop takes `small`, `medium`, and `large` values that can be used to
render octicons at standard sizes:

| Prop | Rendered Size |
| :- | :- |
| `size='small'` | 16px height by `computed` width |
| `size='medium'` | 32px height by `computed` width |
| `size='large'` | 64px height by `computed` width |

```js
// Example usage
import LogoGithub from '@primer/octicons-react/icons/LogoGithub'

export default () => (
  <h1>
    <a href='https://github.com'>
      <LogoGithub size='large' ariaLabel='GitHub'/>
    </a>
  </h1>
)
```


## Custom icons
Each of our icon components is really just a function that renders its SVG
`<path>`. To accommodate icons varying aspect ratios, the `Octicon` component
determines the `viewBox` of the `<svg>` element by first looking for a `size`
array on the icon component class. For instance, if you wanted to create a
custom icon that consisted of three circles side by side, you could do this:

```jsx
import React from 'react'
import Octicon from '@primer/octicons-react'

function CirclesIcon() {
  return (
    <React.Fragment>
      <circle r={5} cx={5} cy={5}/>
      <circle r={5} cx={15} cy={5}/>
      <circle r={5} cx={25} cy={5}/>
    </React.Fragment>
  )
}

CirclesIcon.size = [30, 10]

export default CirclesOcticon(props) {
  return <Octicon {...props} icon={CirclesIcon} />
}
```


## License

(c) GitHub, Inc.

When using the GitHub logos, be sure to follow the [GitHub logo
guidelines](https://github.com/logos).

[MIT](./LICENSE)

[octicons]: https://octicons.github.com/
[primer]: https://github.com/primer/primer
[docs]: http://primercss.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[tree-shaking]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
[aria-label]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
