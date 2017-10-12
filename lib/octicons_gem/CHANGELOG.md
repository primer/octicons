# HEAD

# 4.0.2

- Patch from octicons kebab-vertical typo

# 4.0.1

- Updating to new version of [octicons@6.0.0](https://github.com/primer/octicons/blob/master/CHANGELOG.md#600)

# 3.0.1

- Fixes: project icon wasn't rendering properly

# 3.0.0

- Added: `to_svg_use` which will output a `<svg><use>` tag for svg spritesheets
- Added: Ability to output the spritesheet with `Octicons.sprite_sheet`
- Updating to new version of [octicons@5.0.0](https://github.com/primer/octicons/blob/master/CHANGELOG.md#500)
- Removed: api endpoints for `decimal`, `hexadecimal`, and `character`
- Removed: svg directory from `/lib/` this isn't necessary anymore with the updated `data.json` from 5.0.0
- Removed: `Octicons::KEYWORDS` and `Octicons::CODEPOINTS`, Codepoints is deprecated and Keywords can be accessed via `Octicons::OCTICON_SYMBOLS`

# 2.1.0

- Updating to new version of [octicons@4.3.0](https://github.com/primer/octicons/blob/master/CHANGELOG.md#430)

# 2.0.0

- Adding: attr_reader for `:path, :options, :width, :height` https://github.com/primer/octicons_gem/pull/6
- Adding: `keywords.json` and `codepoints.json` methods to the octicon object. Making them available via the api https://github.com/primer/octicons_gem/pull/7
- Deprecating: the use of `:size` for "large" or a number, instead use `:height` https://github.com/primer/octicons_gem/pull/8
- Deprecate: the use of `:symbol`, instead the first argument is the symbol https://github.com/primer/octicons_gem/pull/9

# 1.1.0

- Added new octicons version 4.1.0

# 1.0.0

- First release, it's an octicons gem.
