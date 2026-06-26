# octicons_helper

[![Gem version](https://img.shields.io/gem/v/octicons_helper.svg)](https://rubygems.org/gems/octicons_helper)


This rails helper lets you easily include svg octicons in your rails apps.

## Install

1. Add this to your `Gemfile`

    ```rb
    gem 'octicons_helper'
    ```

3. Use this tag in your erbs

    ```rb
    <%= octicon "alert", :height => 32,  :class => "right left", :"aria-label" => "hi" %>
    ```
We recommend including the CSS in the [`@primer/octicons`](/packages/javascript) npm module. You can also npm install that package and include `build/build.css` in your styles.