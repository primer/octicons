# @primer/octicons


[![npm version](https://img.shields.io/npm/v/@primer/octicons.svg)](https://www.npmjs.org/package/@primer/octicons)

## Install

This package is distributed with [npm][npm]. After [installing npm][install-npm], you can install `@primer/octicons` with this command:

```shell
npm install @primer/octicons
```

## Usage

For all the usages, we recommend using the CSS located in [`build/build.css`](https://unpkg.com/@primer/octicons/build/build.css). This is some simple CSS to normalize the icons and inherit colors.

After installing `@primer/octicons` you can access the icons like this:

```js
var octicons = require("@primer/octicons")
octicons.alert
// {
//     symbol: 'alert',
//     keywords: ['warning', 'triangle', 'exclamation', 'point'],
//     toSVG: [Function]
//     heights: {
//         16: {
//             width: 16,
//             path: '<path d="M8.865 1.52c-.18-.31-.51-.5-.87-.5s-.69.19-.87.5L.275 13.5c-.18.31-.18.69 0 1 .19.31.52.5.87.5h13.7c.36 0 .69-.19.86-.5.17-.31.18-.69.01-1L8.865 1.52zM8.995 13h-2v-2h2v2zm0-3h-2V6h2v4z"/>',
//             options: {
//                 version: '1.1',
//                 width: '16',
//                 height: '16',
//                 viewBox: '0 0 16 16',
//                 class: 'octicon octicon-alert',
//                 'aria-hidden': 'true'
//             },
//         },
//         24: ...
//     }
// }
```

There will be a key for every icon, with [`toSVG`](#octiconsnametosvg) and other properties.

_Note: `alert` in the above example can be replaced with any valid icon name. Icons with multi-word names (e.g. `arrow-right`) **cannot** be accessed using dot notation (e.g. `octicons.alert`). Instead, use bracket notation (e.g. `octicons['arrow-right']`)._

### `octicons[name].symbol`

Returns the string of the symbol name, same as the key for that icon.

```js
octicons.x.symbol
// "x"
```

### `octicons[name].keywords`

Returns an array of keywords for the icon. The data comes from [keywords.json](https://github.com/primer/octicons/blob/main/keywords.json). Consider contributing more aliases for the icons.

```js
octicons.x.keywords
// ["remove", "close", "delete"]
```

### `octicons[name].heights`

Each icon can have multiple SVGs that are designed for different sizes. The `heights` property allows you to access all the SVGs for an icon using the natural height of the SVG.


```js
octicons.x.heights
// {
//     16: {
//         width: 16,
//         path: '<path d="..."/>',
//         options: {
//             version: '1.1',
//             width: '16',
//             height: '16',
//             viewBox: '0 0 16 16',
//             class: 'octicon octicon-alert',
//             'aria-hidden': 'true'
//         },
//     },
//     24: {
//         width: 24,
//         path: '<path d="..."/>',
//         options: {
//             version: '1.1',
//             width: '24',
//             height: '24',
//             viewBox: '0 0 24 24',
//             class: 'octicon octicon-alert',
//             'aria-hidden': 'true'
//         },
//     },
// }
```


### `octicons[name].heights[height].width`

Returns the icon's true width, based on the SVG view box width. _Note, this doesn't change if you scale it up with size options, it only is the natural width of the icon._

### `octicons[name].heights[height].path`

Returns the string representation of the path of the icon.

```js
octicons.x.heights[16].path
// <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path>
```

### `octicons[name].heights[height].options`

This is an object of all the attributes that will be added to the output tag.

```js
octicons.x.heights[16].options
// { version: '1.1', width: '12', height: '16', viewBox: '0 0 12 16', class: 'octicon octicon-x', 'aria-hidden': 'true' }
```

### `octicons[name].toSVG()`

Returns a string of the `<svg>` tag.

```js
octicons.x.toSVG()
// <svg version="1.1" width="12" height="16" viewBox="0 0 12 16" class="octicon octicon-x" aria-hidden="true"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"/></svg>
```

The `.toSVG()` method accepts an optional `options` object. This is used to add CSS class names, accessibility options, and sizes.

#### class

Add more CSS classes to the `<svg>` tag.

```js
octicons.x.toSVG({ "class": "close" })
// <svg version="1.1" width="12" height="16" viewBox="0 0 12 16" class="octicon octicon-x close" aria-hidden="true"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"/></svg>
```

#### aria-label

Add accessibility `aria-label` to the icon.

```js
octicons.x.toSVG({ "aria-label": "Close the window" })
// <svg version="1.1" width="12" height="16" viewBox="0 0 12 16" class="octicon octicon-x" aria-label="Close the window" role="img"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"/></svg>
```

#### width and height

Size the SVG icon larger using `width` and `height` independently or together. `.toSVG()` will automatically choose the best SVG to render based on the width or height passed in.

```js
octicons.x.toSVG({ "width": 45 })
// <svg version="1.1" width="45" height="45" viewBox="0 0 24 24" class="octicon octicon-x" aria-hidden="true"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"/></svg>
```

[primer]: https://github.com/primer/primer
[docs]: http://primercss.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
