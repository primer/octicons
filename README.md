# Octicons

[![octicons](https://user-images.githubusercontent.com/54012/37737576-5d1e8c7a-2d11-11e8-8fd9-13956a241549.png)][figma-file]

[![Build Status](https://travis-ci.org/primer/octicons.svg?branch=master)](https://travis-ci.org/primer/octicons)

Octicons are a set of SVG icons built by GitHub for GitHub. This repository is a mono repository that contains [distribution libraries for other platforms/languages](#libraries). The vectors for all the icons are stored in a [Figma file][figma-file].

## Adding/Updating an icon

Read through our [contributing guide](./.github/CONTRIBUTING.md#adding-or-updating-icons) if you're planning on adding or updating one of the icons.

## Libraries

This repository is a repository containing other packages. Each of them are in the `lib/` folder and give access to Octicons on a different platform / language.

### JavaScript

The octicons node.js library is the main JavaScript library. With [a JavaScript API](/lib/octicons_node/README.md) that can be used in a variety of applications.

| Package | Version |
|---|---|
| **[octicons](/lib/octicons_node)** <br />Node.js package with Javascript API | [![npm version](https://img.shields.io/npm/v/octicons.svg)](https://www.npmjs.org/package/octicons) |

### Ruby

| Package | Version |
|---|---|
| **[octicons](/lib/octicons_gem)** <br />Ruby gem with Ruby API | [![Gem version](https://img.shields.io/gem/v/octicons.svg)](https://rubygems.org/gems/octicons) |
| [octicons_helper](/lib/octicons_helper)<br />Rails helper for using octicons|  [![Gem version](https://img.shields.io/gem/v/octicons_helper.svg)](https://rubygems.org/gems/octicons_helper) |
| [jekyll-octicons](/lib/jekyll-octicons)<br />Jekyll plugin for using octicons | [![Gem version](https://img.shields.io/gem/v/jekyll-octicons.svg)](https://rubygems.org/gems/jekyll-octicons) |

## License

(c) GitHub, Inc.

When using the GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).

_Code License:_ [MIT](./LICENSE)  
Applies to all other files

[figma-file]: https://www.figma.com/file/FP7lqd1V00LUaT5zvdklkkZr/Octicons
[octicons_gem]:
[octicons_node]:
[octicons_helper]:
[octicons_jekyll]:
