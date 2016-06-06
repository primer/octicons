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

## License

_Code License:_ [MIT](./LICENSE) &copy; [GitHub](https://github.com/)

_Font License:_ [SIL OFL 1.1](./LICENSE) &copy; [GitHub](https://github.com/)

[primer]: https://github.com/primer/primer
[docs]: http://primercss.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[sketch-document]: https://github.com/primer/octicons/blob/master/lib/octicons-master.sketch
