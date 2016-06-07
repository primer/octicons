# Octicons jekyll tag

[![Gem version](https://img.shields.io/gem/v/jekyll-octicons.svg)](https://rubygems.org/gems/jekyll-octicons)
[![Build Status](https://travis-ci.org/primer/jekyll-octicons.svg?branch=master)](https://travis-ci.org/primer/jekyll-octicons)

> A liquid jekyll tag that injects Octicon svg into the page

This jekyll liquid tag, is a plugin that will let you easily include svg [octicons][octicons] in your jekyll sites.

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
    {% octicon :symbol => "alert", :size => "large", :class => "right left", :'aria-label' => "hi" %}
    ```

## Documentation

For a full list of options available, see the [octicons_gem documentation](https://github.com/primer/octicons_gem#documentation)

## License

_Code License:_ [MIT](./LICENSE) &copy; [GitHub](https://github.com/)

_Font License:_ [SIL OFL 1.1](./LICENSE) &copy; [GitHub](https://github.com/)

[octicons]: https://github.com/primer/octicons
[octicons-docs]: https://octicons.github.com/
