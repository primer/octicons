# @primer/styled-octicons

[![npm version](https://img.shields.io/npm/v/@primer/styled-octicons.svg)](https://www.npmjs.org/package/@primer/styled-octicons)

The `@primer/styled-octicons` package wraps icon components from [`@primer/octicons-react`](/packages/react) with [system props](https://primer.style/components/system-props), making them easier to style in projects that use [styled system](https://styled-system.com/)—like [Primer React](https://primer.style/components).

## Install

```shell
npm install @primer/styled-octicons
```

## Usage

`@primer/styled-octicons`  exports each icons as a named export. This allows you to import only the icons you need:

```jsx
import {AlertIcon} from '@primer/styled-octicons'

export () => (
  <AlertIcon color="red.6" mr={2} />
)
```

## System props

All icon components in `@primer/styled-octicons` get `color` and `space` system props as well as the `sx` prop. Read the Primer React [System Props](https://primer.style/components/system-props) documentation for a full list of available props.


## Props

In addition to system props, icon components in `@primer/styled-octicons` accept the same props as components in `@primer/octicons-react`:

| Name | Type | Default | Description |
| :- | :- | :-: | :- |
| aria-label | String | | Sets the [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) attribute of the `<svg>`. If no `aria-label` is defined, `aria-hidden` will be set to `true`.  |
| className | String | | Sets the `class` attribute on the `<svg>`. |
| size | Number \| `"small"` \| `"medium"` \| `"large"` | `16` | The height of the icon. Width will be scaled proportionally. |
| verticalAlign | `"middle"` \| `"text-bottom"` \| `"text-top"` \| `"top"` \| `"unset"` | `"text-bottom"` | The vertical alignment of the `<svg>`. |
