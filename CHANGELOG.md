# 9.5.0

## Features
- New icon `internal-repo` https://github.com/primer/octicons/pull/375

# 9.4.0

##  Features
- New icons `heart-outline` `infinity` `line-arrow-up` `line-arrow-down` `line-arrow-right` `line-arrow-left` https://github.com/primer/octicons/pull/365

## Chores
- Contributing docs updates and issue template updates #367 

## Bugs
- Update `heart` glyphs removing extra points https://github.com/primer/octicons/pull/365

# 9.3.1

## Bugfix

- Workflow icon had a cutoff edge.

# 9.3.0

### 🚀 New Features

- Workflow icons https://github.com/primer/octicons/pull/356 @ashygee
- Allow 'unset' value for verticalAlign property https://github.com/primer/octicons/pull/354 @Fs00

# 9.2.0

### 🚀 New features

 - [x] New icons for save/unsave and primitive dot stroke https://github.com/primer/octicons/pull/351 @ashygee @colinkeany

### 🧽 Chores

- [x] Migrating to new yml actions syntax https://github.com/primer/octicons/pull/332 @max & @jonrohan
- [x] Update jekyll gemspec to support Jekyll 4.0 https://github.com/primer/octicons/pull/347 @ntotten

### 🐛 Bugs

- [x] Octicons react isn't including className https://github.com/primer/octicons/pull/271 @pocke

# 9.1.1

### :bug: Bug Fix

- [x] renamed the original shield icon to `shield-lock` https://github.com/primer/octicons/issues/323 @ashygee
- [x] test for duplicate icons https://github.com/primer/octicons/pull/322 @jonrohan

# 9.1.0

### 🚀 New features

- [x] Adding skip icon https://github.com/primer/octicons/pull/318 @ashygee

# 9.0.0

### 💥 Breaking changes
- [x] Rename `octicons` to `@primer/octicons` https://github.com/primer/octicons/pull/311
- [x] Rename `@githubprimer/octicons-react` to `@primer/octicons-react` https://github.com/primer/octicons/pull/311

### 🚀 New features

- [x] Adding a shield icon https://github.com/primer/octicons/pull/310 @ashygee @donokuda
- [x] Adding new repo icons https://github.com/primer/octicons/issues/316 @superbryntendo

# 8.5.0

- a11y aria-hidden update from @muan https://github.com/primer/octicons/pull/295
- Verified icons poor rendering. @ashygee https://github.com/primer/octicons/pull/297
- Docs update for contributing @ashygee https://github.com/primer/octicons/pull/298

# 8.4.2

### :art: Enhancement
- Thumbs up/down icons needed some vector improvements. https://github.com/primer/octicons/pull/287

### :bug: Bug Fix
- Node package missing `build/build.css` file. https://github.com/primer/octicons/pull/292

# 8.4.1

### :bug: Bug Fix
- Rollup files missing from octicons react package https://github.com/primer/octicons/issues/282

# 8.4.0

### :house: Internal
- Using Actions to build and deploy Octicons https://github.com/primer/octicons/pull/276

#### Committers: 1
- Jon Rohan ([jonrohan](https://github.com/jonrohan))

# 8.3.0

- New "changes requested" icon https://github.com/primer/octicons/pull/267
- Contrib Doc Updates https://github.com/primer/octicons/pull/256
- Updating licenses to 2019 https://github.com/primer/octicons/pull/272

# 8.2.0

- Add `fold-up` and `fold-down` icons, courtesy of @pmarsceill

# 8.1.3

- Add `eye-closed` icon, courtesy of @colinkeany

# 8.1.2

- Patch release for failed 8.1.1 release

# 8.1.1

- Fix for `list-ordered` icon https://github.com/primer/octicons/pull/252
- In React Octicons, we set aria-hidden to false if there's an aria-label provided

# 8.1.0

- Add the `arrow-both` icon courtesy of @venetucci
- TypeScript types are now available thanks to @j-f1!
- Fix CI builds for outside contributors (as long as they aren't changing octicons)
- Fix typo in README
- Update README with `@githubprimer/octicons-react scope`
- Publish release candidates from any branch beginning with `release`

# 8.0.0

- Breaking changes in `octicons_react` [#225](https://github.com/primer/octicons/pull/225)
- After the initial release of octicons_react https://github.com/primer/octicons/releases/tag/v7.4.0, we needed to rename the scope of the package. Due to some deployment conflicts in our pipelines.

# 7.4.0

- This release marks the first official version of Octicons for React! Check out the `@github/octicons-react` package on npm for more info, or peruse the long-running PR [#222](https://github.com/primer/octicons/pull/222).
- CI status is now reported to the `#design-ops` Slack channel
- Jekyll Octicons has moved in this repo from `lib/jekyll-octicons` to `lib/octicons_jekyll`

# 7.3.0

- Fix for heart icon https://github.com/primer/octicons/pull/211
- Adding an archive icon created by @colinkeany
- Fixes https://github.com/primer/octicons/issues/182
- Fixed versioning strategy https://github.com/primer/octicons/pull/#208

# Archived releases

### Octicons_node 7.0.0

- Removing `file-text` and `mail-reply` icons. Use `file` and `reply` respectively.
- Removing spritesheet calls and `toSVGUse` method.

### Octicons_gem 5.0.4

- Removing `file-text` and `mail-reply` icons. Use `file` and `reply` respectively.
- Removing spritesheet calls and `to_svg_use` method.

### 6.0.1

Fixes:

- Typo `kebab-veritcal` becomes `kebab-vertical`

### 6.0.0

Added:

- `kebab-horizontal` and `kebab-vertical` icons
- Polyfill for the `Object.assign` function

Removes:

- Removing a duplicate `ellipses` icon from the set. Use `ellipsis` instead.

### 5.0.1

Fixes:

- projects icon renders as a block, using `fill-rule` fixes it

### 5.0.0

Adds:

- `project`
- `note`
- `screen-full`
- `screen-normal`
- More node.js api endpoints for accessing icons https://github.com/primer/octicons/pull/120
- Creating a spritesheet demo https://github.com/primer/octicons/pull/121

Removes:

- Deprecating support for the webfont https://github.com/primer/octicons/pull/117
- Stop checking `/build/` directory into repository https://github.com/primer/octicons/pull/118
- Removing sass as a dependency https://github.com/primer/octicons/pull/119

### 4.4.0

Adds:

- svg.json file that is accessible from node require

### 4.3.0

Fixes:

- Vertical alignment on `italic`

Modifies:

- `person`
- `organization`

### 4.2.1

Fixes:

- Removing inline sourcemap from `min` versions of css.

### 4.2.0

Adds:

- Keywords.json file that has an index of all octicons with alias names

### 4.1.1 (June 16, 2016)

Fixes:

- Putting the `$octicons-font-path` back in the scss file.

### 4.1.0 (June 6, 2016)

Adds:

- Installation docs https://github.com/primer/octicons/pull/94
- `grabber`
- `plus-small`

Modifies:

- `smiley`

Refines:

- Renames `mail-reply` to `reply` and refines its shape.

Fixes:

- Revert license back to SPDX standard

### 4.0.0 (June 6, 2016)

Adds:

- Whole new grunt build system including svg sprite sheet.
- adding css min https://github.com/primer/octicons/pull/60
- adding woff2 format https://github.com/primer/octicons/issues/3
- creates spritesheet of svg files https://github.com/primer/octicons/issues/88

Removes:

- Bower support

Fixes:

- all svg icons include viewBox https://github.com/primer/octicons/issues/87
- license in package.json https://github.com/primer/octicons/issues/85

### 3.5.0 (February 12, 2016)

Adds:

- `unverified`

Refines:

- `verified`

### 3.4.1 (January 24, 2016)

This includes various SVG viewport refinements.

Refines:

- `thumbs-down`
- `logo-github`

### 3.4.0 (January 22, 2016)

Adds:

- `verified`
- `smiley`

Removes:

- `color-mode`

Refines:

- `primitive-dot`
- `horizontal-rule`
- `triangle-down`
- `triangle-up`
- `triangle-left`
- `triangle-right`
- `globe`
- `flame`
- `comment-discussion`

### 3.3.0 (November 12, 2015)

Adds:

- `logo-gist`

Resizes all our SVG to be 16x16 instead of 1024x1024

### 3.2.0 (November 6, 2015)

Adds:

- `bold`
- `text-size`
- `italic`
- `tasklist`

It also normalizes some styling in:

- `list-unordered`
- `list-ordered`
- `quote`
- `mention`
- `bookmark`
- `threebars`

Removes

- `screen-normal`
- `screen-full`


### 3.1.0 (August 13, 2015)

Adds

- `shield`

This thickens stroke widths slightly on the following icons:

- `circle-slash`
- `clock`
- `cloud-upload`
- `cloud-download`
- `dashboard`
- `info`
- `issue-closed`
- `issue`
- `issue-reopened`
- `history`
- `question`
- `search`

Fills `comment-discussion`

Thickens `x` to match `checkmark`

### 3.0.1 (August 10, 2015)

Some files were missing in `3.0.0`

### 3.0.0 (August 10, 2015)

Removes

- `microscope`
- `beer`
- `split`
- `puzzle`
- `steps`
- `podium`
- `timer`
- all `alignment` icons
- all `move` icons
- all `playback` icons
- all `jump` icons

Adds

- `beaker`
- `bell`
- `desktop-download`
- `watch`

Line-weight changes, sizing normalization, and new drawings

- `circle-slash`
- `lock`
- `cloud-upload`
- `cloud-download`
- `plus`
- `✕`
- `broadcast`
- `lock`
- all `repo` icons
- organization
- person
- all `chevrons` & `triangles`
- all `diff` icons
- `clippy`
- all `issue` and circular icons
- `rss`
- `ruby`
- `cancel`
- `settings`
- `mirror`
- `external-link`
- `history`
- `gear`
- `settings`
- `info`
- `history`
- `package`
- `gist-secret`
- `rocket`
- `law`
- `telescope`
- `search`
- `tag`
- `normal-screen`
- `iphone`
- `no-new-line`
- `desktop`
- all `git` icons
- `circuit-board`
- `heart`
- `home`
- `briefcase`
- `wiki`
- `bookmark`
- `briefcase`
- `calendar`
- `color-mode`
- `comment`
- `discussions`
- `credit-card`
- `dashboard`
- `camera`
- `video`
- `bug`
- `desktop`
- `ellipses`
- `eye`
- all `files` & `folders`
- `fold`
- `unfold`
- `gift`
- `graph`
- `hubot`
- `inbox`
- `jersey`
- `keyboard`
- `light-bulb`
- `link`
- `location`
- `mail`
- `mail-read`
- `marker`
- `plug`
- `mute`
- `pencil`
- `push-pin`
- `fullscreen`
- `unfullscreen`
- `server`
- `sign-in`
- `sign-out`
- `tag`
- `terminal`
- `thumbs-up`
- `thumbs-down`
- `trash`
- `unmute`
- `versions`
- `gist`
- `key`
- `megaphone`
- `checklist`

## 2.4.1 (June 2, 2015)

- Add the scss file I forgot to include

## 2.4.0 (June 2, 2015)

- Add `octicons.scss`
- Revert path changes to `sprockets-octicons.scss`, as they broke octicons in sprockets.

## 2.3.0 (May 28, 2015)

- Add a path variable to `sprockets-octicons.scss` to be consistent with octicons.less`

## 2.2.3 (May 21, 2015)

- Use SPDX license identifiers in package.json

## 2.2.2 (April 1, 2015)

Fixes file icons for

- `file-binary`
- `file-code`
- `file-media`
- `file-pdf`
- `file-symlink-file`
- `file-text`
- `file-zip`

## 2.2.1 (March 30, 2015)

- Fix vector artifact and smooth curves in `mark-github`

## 2.2.0 (Feb 18, 2015)

- Add two new icons: `thumbsup` and `thumbsdown`

## 2.0.1 (June 16, 2014)

- Add mention of github.com/logos to the license

## 2.0.0 (June 16, 2014)

- Hello world
