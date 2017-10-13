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

The minimum CSS you'll need in your rails app is in the [octicons][octicons] repository. You can also npm install that package and include `build/octicons.css` in your styles.

## Documentation

For a full list of options available, see the [octicons_gem documentation](https://github.com/primer/octicons_gem#documentation)

## Publishing

If you have access to publish this repository, these are the steps to publishing. If you need access, contact [#design-systems](https://github.slack.com/archives/design-systems).

**Before publishing** This repository relies on the data from [octicons_gem](https://github.com/primer/octicons_gem). To update to the most recent version, you'll need to run `npm run update`

1. Update the [CHANGELOG.md](./CHANGELOG.md) with relevant version number and any updates made to the repository.
2. Update the version in [version.rb](https://github.com/primer/octicons_helper/blob/master/lib/octicons_helper/version.rb) using the relevant version. The versioning is [semver](http://semver.org/), so version appropriately based on what has changed.
3. `npm version <newversion>` Use the same version that you added in step 2.
4. `npm run ship` This will build the gem and publish it to rubygems.
5. `git push && git push --tags` Push all these changes to origin.

## License

(c) 2012-2017 GitHub, Inc.

When using the GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).

_Font License:_ [SIL OFL 1.1](http://scripts.sil.org/OFL)  
Applies to all font files and SVG files

_Code License:_ [MIT](./LICENSE)  
Applies to all other files

[octicons]: https://github.com/primer/octicons
[octicons-docs]: https://octicons.github.com/
