# Octicons gem

[![Gem version](https://img.shields.io/gem/v/octicons.svg)](https://rubygems.org/gems/octicons)
[![Build Status](https://travis-ci.org/primer/octicons.svg?branch=master)](https://travis-ci.org/primer/octicons)

> Octicons gem to distribute octicons svg

## Install

Add this to your `Gemfile`

```rb
gem 'octicons'
```

Then `bundle install`.

## Usage

```rb
require 'octicons'
icon = Octicons::Octicon.new("x")
icon.to_svg
# <svg class="octicon octicon-x" viewBox="0 0 16 16" width="16" height="16" version="1.1" "aria-hidden"="true"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg>
```

## Documentation

The `Octicon` class takes two arguments. The first is the symbol of the icon, and the second is a hash of arguments representing html attributes

#### `symbol` _(required)_

This is the name of the octicon you want to use. For example `alert`. [Full list of icons][octicons-docs]

#### Options

* `:height` - When setting the height to a number, the icon will scale to that size. For example, passing `32`, will calculate the width based on the icon's natural size.
* `:width` - When setting the width to a number, the icon will scale to that size. For example, passing `32`, will calculate the width based on the icon's natural size.

If both `:width, :height` are passed into the options hash, then the icon will be sized exactly at those dimensions.

#### Attributes

Once initialized, you can read a few properties from the icon.

##### `symbol`

Returns the string of the symbol name

```rb
icon = Octicons::Octicon.new("x")
icon.symbol
# "x"
```

##### `path`

Path returns the string representation of the path of the icon.

```rb
icon = Octicons::Octicon.new("x")
icon.path
# <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path>
```

##### `options`

This is a hash of all the `options` that will be added to the output tag.

```rb
icon = Octicons::Octicon.new("x")
icon.options
# {:class=>"octicon octicon-x", :viewBox=>"0 0 12 16", :version=>"1.1", :width=>12, :height=>16, :"aria-hidden"=>"true"}
```

##### `width`

Width is the icon's true width. Based on the svg view box width. _Note, this doesn't change if you scale it up with size options, it only is the natural width of the icon_

##### `height`

Height is the icon's true height. Based on the svg view box height. _Note, this doesn't change if you scale it up with size options, it only is the natural height of the icon_

##### `keywords`

Returns an array of keywords for the icon. The data comes from the [data file in lib](../data.json). Consider contributing more aliases for the icons.

```rb
icon = Octicons::Octicon.new("x")
icon.keywords
# ["remove", "close", "delete"]
```

#### Methods

##### `to_svg`

Returns a string of the svg tag

```rb
icon = Octicons::Octicon.new("x")
icon.to_svg
# <svg class="octicon octicon-x" viewBox="0 0 16 16" width="16" height="16" version="1.1" "aria-hidden"="true"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg>
```

## Documentation

For a full list of options available, see the [octicons_gem documentation](../octicons_gem/#documentation)

## License

(c) GitHub, Inc.

When using the GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).

[MIT](./LICENSE)  

[octicons]: https://github.com/primer/octicons
[octicons-docs]: https://octicons.github.com/
