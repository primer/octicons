# Octicons

[![Build Status](https://travis-ci.org/primer/octicons.svg?branch=master)](https://travis-ci.org/primer/octicons)

> Octicons are a scalable set of icons handcrafted with <3 by GitHub.

## Adding/Updating an icon

To begin working with this repository you'll need to run `script/bootstrap`. This installs everything needed. Currently there's a requirement of [Sketch](https://www.sketchapp.com/) to be able to edit and export the SVG files.

Open up the [octicons-master.sketch file](). Edit the slice you want to update, or add a new one. Save the file. If you've added a new icon, you'll need to add a new entry and keywords for it in the `data.json` file. Run `script/build`. This will export the octicons from the sketch file, minify them, and output into `lib/*/build/svg` directories.

## Libraries

This repository is a repository containing other packages. Each of them are in the `lib/` folder and give access to octicons on a different platform / language.

| Package | Version |
|---|---|
| **[octicons](/lib/octicons_node)** <br />Node.js package with Javascript API | [![npm version](https://img.shields.io/npm/v/octicons.svg)](https://www.npmjs.org/package/octicons) |
| **[octicons](/lib/octicons_gem)** <br />Ruby gem with Ruby API | [![Gem version](https://img.shields.io/gem/v/octicons.svg)](https://rubygems.org/gems/octicons) |
| [octicons_helper](/lib/octicons_helper)<br />Rails helper for using octicons|  [![Gem version](https://img.shields.io/gem/v/octicons_helper.svg)](https://rubygems.org/gems/octicons_helper) |
| [jekyll-octicons](/lib/jekyll-octicons)<br />Jekyll plugin for using octicons | [![Gem version](https://img.shields.io/gem/v/jekyll-octicons.svg)](https://rubygems.org/gems/jekyll-octicons) |

## License

(c) 2012-2017 GitHub, Inc.

[MIT](./LICENSE)
