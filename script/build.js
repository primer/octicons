#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const cheerio = require('cheerio')
const trimNewlines = require('trim-newlines')
const yargs = require('yargs')
const flatMap = require('lodash.flatmap')
const keyBy = require('lodash.keyby')
const keywords = require('../keywords.json')

// This script generates a JSON file that contains
// information about input SVG files.

const {argv} = yargs
  .usage('Usage: $0 --input <input file paths> --output <output file path>')
  .example('$0 --input icons/**/*.svg --output build/data.json')
  .option('input', {alias: 'i', type: 'array', demandOption: true, describe: 'Input SVG files'})
  .option('output', {alias: 'o', type: 'string', demandOption: true, describe: 'Ouput JSON file'})

// The `argv.input` array could contain globs (e.g. "**/*.svg").
// We're using `flatMap` and `glob` to transform `argv.input` into
// a flat array of file paths.
const filePaths = flatMap(argv.input, pattern => glob.sync(pattern))

const icons = filePaths.map(filepath => {
  const name = path.parse(filepath).name
  const svg = fs.readFileSync(path.resolve(filepath), 'utf8')
  const svgElement = cheerio.load(svg)('svg')
  const width = parseInt(svgElement.attr('width'))
  const height = parseInt(svgElement.attr('height'))
  const innerHtml = trimNewlines(svgElement.html()).trim()
  return {
    name,
    keywords: keywords[name] || [],
    width,
    height,
    path: innerHtml
  }
})

const iconsByName = keyBy(icons, 'name')

fs.outputJsonSync(path.resolve(argv.output), iconsByName)
