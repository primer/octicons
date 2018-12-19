# Octicons rails helper

[![Gem version](https://img.shields.io/gem/v/octicons_helper.svg)](https://rubygems.org/gems/octicons_helper)
[![Build Status](https://travis-ci.org/primer/octicons.svg?branch=master)](https://travis-ci.org/primer/octicons)

> A rails helper that inlines SVG octicons

This rails helper let's you easily include svg [octicons][octicons-docs] in your rails apps.

## Install

1. Add this to your `Gemfile`

    ```rb
    gem 'octicons_helper'
    ```

3. Use this tag in your erbs

    ```rb
    <%= octicon "alert", :height => 32,  :class => "right left", :"aria-label" => "hi" %>
    ```

We recommend including the CSS in the [octicons_node](../octicons_node/) module. You can also npm install that package and include `build/build.css` in your styles.

## Documentation

For a full list of options available, see the [octicons_gem documentation](../octicons_gem/#documentation)

## License

(c) GitHub, Inc.

When using the GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).

[MIT](./LICENSE)  

[octicons]: https://github.com/primer/octicons
[octicons-docs]: https://octicons.github.com/
