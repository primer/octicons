# jekyll-octicons

[![Gem version](https://img.shields.io/gem/v/jekyll-octicons.svg)](https://rubygems.org/gems/jekyll-octicons)

The Jekyll liquid tag is a plugin that lets you include octicons in your Jekyll sites.

## Install

1. Add this to your `Gemfile`

    ```rb
    gem 'jekyll-octicons'
    ```

2. Add this to your jekyll `_config.yml`

    ```yml
    plugins:
      - jekyll-octicons
    ```

3. Use this tag in your jekyll templates

    ```
    {% octicon alert height:32 class:"right left" aria-label:hi %}
    ```

We recommend including the CSS in the [`@primer/octicons`](/packages/javascript) npm module. You can also npm install that package and include `build/build.css` in your styles.
