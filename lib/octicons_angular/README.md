# @openproject/octicons-angular

[![npm version](https://img.shields.io/npm/v/@openproject/octicons-angular.svg)](https://www.npmjs.org/package/@openproject/octicons-angular)

## Install

```shell
npm install @openproject/octicons-angular
```

## Usage

### Angular component

The `@openproject/octicons-angular` module exports standalone components as [named
exports](https://ponyfoo.com/articles/es6-modules-in-depth#named-exports). This
allows you to import only the icons that you need without blowing up your
bundle:

```ts
import { Component } from '@angular/core';
import { LogIconComponent } from '@openproject/octicons-angular';

@Component({
  imports: [
    LogIconComponent,
  ],
  template: `<svg log-icon></svg>`,
})
export class MyComponent {}
```

In the code you simply use an `svg` tag with the name as attribtue. E.g:

```html
<svg log-icon></svg>
```

#### Vertical alignment

By default the octicons have `vertical-align: text-bottom;` applied as inline
styles. You can change the alignment via the `verticalAlign` input, which can be
either `middle`, `text-bottom`, `text-top`, or `top`.

```html
<svg
  log-icon
  vertical-align="text-bottom"  
></svg>
```

#### `aria-label`

You have the option of adding accessibility information to the icon with the
[`aria-label` attribute][aria-label] via the `aria-label` input.

```html
<svg
  log-icon
  aria-label="Look at the logs"  
></svg>
```

#### `aria-labelledby`

You have the option of adding accessibility information to the icon with the
[`aria-labelledby` attribute][aria-labelledby] via the `aria-labelledby` input. Using aria-labelledby referencing the id values of the title element provides the accessible name.

```html
<svg
  log-icon
  aria-labelledby="title"  
  title="Look at the logs"  
></svg>
```

#### `title`

You have the option of adding accessibility information to the icon with the
[`title` attribute][title] via the `title` input.

#### `id`

You have the option of adding information to the icon with the
[`id` attribute][id] via the `id` input.

```html
<svg
  log-icon
  id="unique-log-icon"  
></svg>
```

#### `tabIndex`

You can add the `tabindex` attribute to an SVG element via the `tabIndex` input if the SVG element is intended to be interactive.
`tabIndex` input also controls the `focusable` attribute of the SVG element which is defined by SVG Tiny 1.2 and only implemented in
Internet Explorer and Microsoft Edge.

If there is no `tabIndex` input is present (default behavior), it will set the `focusable` attribute to `false`. This is helpful
for preventing the decorative SVG from being announced by some specialized assistive technology browsing modes which can get delayed
while trying to parse the SVG markup.

```html
<svg
  log-icon
  aria-label="Interactive log icon"  
  [tabIndex]="0" 
></svg>
```

#### Sizes

The `size` input takes `small`, `medium`, and `large` values that can be used to render octicons at standard sizes:

| Prop            | Rendered Size                   |
| :-------------- | :------------------------------ |
| `size='small'`  | 16px height by `computed` width |
| `size='medium'` | 32px height by `computed` width |
| `size='large'`  | 64px height by `computed` width |

```html
<svg
  log-icon
  size="small"  
></svg>
```

#### Fill

The `fill` input takes a string value that can be used to set the color of the icon.
By default, `fill` is set to [`currentColor`](https://css-tricks.com/currentcolor/).

```html
<svg
  log-icon
  fill="#f00"  
></svg>
```

### Dom string rendering

Alternatively, you can render an icon SVG directly, for example in legacy jQuery code:

```ts
import { logIconData, toDOMString } from '@openproject/octicons-angular';

const mySVGString:string = toDOMString(
  logIconData, // SVG data for the icon. You can get this by importing `${name}IconData`
  'small', // The icon size. Optional
  { 'aria-hidden': 'true' }, // Extra attributes like class, style, aria, and others. Optional.
);
document.body.innerHTML = mySVGString;
```

[octicons]: https://primer.style/octicons/
[primer]: https://github.com/primer/primer
[docs]: http://primercss.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[tree-shaking]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
[aria-label]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
[aria-labelledby]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
[title]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
[id]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
