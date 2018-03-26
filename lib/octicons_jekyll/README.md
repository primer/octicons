# Octicons jekyll tag

[![Gem version](https://img.shields.io/gem/v/jekyll-octicons.svg)](https://rubygems.org/gems/jekyll-octicons)
[![Build Status](https://travis-ci.org/primer/octicons.svg?branch=master)](https://travis-ci.org/primer/octicons)

> A liquid jekyll tag that injects Octicon svg into the page

This jekyll liquid tag, is a plugin that will let you easily include svg [octicons][octicons-docs] in your jekyll sites.

## Install

1. Add this to your `Gemfile`

    ```rb
    gem 'jekyll-octicons'
    ```

2. Add this to your jekyll `_config.yml`

    ```yml
    gems:
      - jekyll-octicons
    ```

3. Use this tag in your jekyll templates

    ```
    {% octicon alert height:32 class:"right left" aria-label:hi %}
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
