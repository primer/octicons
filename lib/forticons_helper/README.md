# forticons_helper

[![Gem version](https://img.shields.io/gem/v/forticons_helper.svg)](https://rubygems.org/gems/forticons_helper)


This rails helper lets you easily include svg forticons in your rails apps.

## Install

1. Add this to your `Gemfile`

    ```rb
    gem 'forticons_helper'
    ```

3. Use this tag in your erbs

    ```rb
    <%= forticon "alert", :height => 32,  :class => "right left", :"aria-label" => "hi" %>
    ```
We recommend including the CSS in the [`@primer/forticons`](/packages/javascript) npm module. You can also npm install that package and include `build/build.css` in your styles.
