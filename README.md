# GitHub Octicons

[![NPM version](https://img.shields.io/npm/v/octicons.svg)](https://www.npmjs.org/package/octicons)
[![Build Status](https://travis-ci.org/primer/octicons.svg?branch=master)](https://travis-ci.org/primer/octicons)

> Octicons are a scalable set of icons handcrafted with <3 by GitHub.

## Install


#### NPM

This repository is distributed with [npm][npm]. After [installing npm][install-npm], you can install `octicons` with this command.

```
$ npm install --save octicons
```

## Usage

The source files included are written in [Sass][sass] (`scss`) You can simply point your sass `include-path` at your `node_modules` directory and import it like this.

```scss
@import "octicons/index.scss";
```

## Changing, adding, or deleting icons

1. Open the [Sketch document][sketch-document] in `/lib/`. Each icon exists as an artboard within our master Sketch document. If you’re adding an icon, duplicate one of the artboards and add your shapes to it. Be sure to give your artboard a name that makes sense.
2. Once you’re happy with your icon set, choose File > Export…
3. Choose all the artboards you’d like to export and then press “Export”
4. Export to `/lib/svg/`

You’ll next need to build your Octicons.

## Building Octicons

All the files you need will be in the `/build/` directory already, but if you’ve made changes to the `/lib/` directory and need to regenerate, follow these steps:

1. Open the Octicons directory in Terminal
2. Run the command `script/bootstrap`. This will install any necessary dependencies for generating the Octicons font and SVGs.
3. Run the command `grunt`. Running the grunt task will generate the font and SVGs, placing them in the `/build/` directory.

## Publishing

If you have access to publish this repository, these are the steps to publishing. If you need access, contact [#design-systems](https://github.slack.com/archives/design-systems).

1. Update the [CHANGELOG.md](./CHANGELOG.md) with relevant version number and any updates made to the repository.
2. `npm version <newversion>` Run [npm version](https://docs.npmjs.com/cli/version) inputing the relevant version type. The versioning is [semver](http://semver.org/), so version appropriately based on what has changed.
3. `npm publish` This will publish the new version to npmjs.org
4. `git push && git push --tags` Push all these changes to origin.

## License

(c) 2012-2016 GitHub, Inc.

When using the GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).

_Font License:_ [SIL OFL 1.1](http://scripts.sil.org/OFL)  
Applies to all font files and SVG files

_Code License:_ [MIT](./LICENSE)  
Applies to all other files

[primer]: https://github.com/primer/primer
[docs]: http://primercss.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[sketch-document]: https://github.com/primer/octicons/blob/master/lib/octicons-master.sketch
