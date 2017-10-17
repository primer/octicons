# Octicons rails helper

[![Gem version](https://img.shields.io/gem/v/octicons_helper.svg)](https://rubygems.org/gems/octicons_helper)
[![Build Status](https://travis-ci.org/primer/octicons_helper.svg?branch=master)](https://travis-ci.org/primer/octicons_helper)

> A rails helper that inlines SVG octicons

This rails helper let's you easily include svg [octicons][octicons] in your rails apps.

## Install

1. Add this to your `Gemfile`

    ```rb
    gem 'octicons_helper'
    ```

3. Use this tag in your erbs

    ```rb
    <%= octicon "alert", :height => 32,  :class => "right left", :"aria-label" => "hi" %>
    ```

## Documentation

For a full list of options available, see the [octicons_gem documentation](https://github.com/primer/octicons_gem#documentation)

## License

(c) 2012-2017 GitHub, Inc.

When using the GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).

_Code License:_ [MIT](./LICENSE)  
Applies to all other files

[octicons]: https://github.com/primer/octicons
[octicons-docs]: https://octicons.github.com/
