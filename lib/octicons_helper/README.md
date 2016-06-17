# Octicons rails helper

[![Gem version](https://img.shields.io/gem/v/octicons_helper.svg)](https://rubygems.org/gems/octicons_helper)
[![Build Status](https://travis-ci.org/primer/octicons_helper.svg?branch=master)](https://travis-ci.org/primer/octicons_helper)

> A rails helper that injects Octicon svg into the page

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

The minimum CSS you'll need in your rails app is in the [octicons][octicons] repository. You can also npm install that package and include `build/octicons.css` in your styles.

## Documentation

For a full list of options available, see the [octicons_gem documentation](https://github.com/primer/octicons_gem#documentation)

## License

_Code License:_ [MIT](./LICENSE) &copy; [GitHub](https://github.com/)

_Font License:_ [SIL OFL 1.1](./LICENSE) &copy; [GitHub](https://github.com/)

[octicons]: https://github.com/primer/octicons
[octicons-docs]: https://octicons.github.com/
