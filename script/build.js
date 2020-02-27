#!/usr/bin/env node
/* eslint-env node */
const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const cheerio = require('cheerio')
const trimNewlines = require('trim-newlines')
const yargs = require('yargs')
const keyBy = require('lodash.keyby')
const keywords = require('../keywords.json')

// This script generates a JSON file that contains
// information about input SVG files.

const {argv} = yargs
  .usage('Usage: $0 --input <input file paths> --output <output file path>')
  .example('$0 --input icons/**/*.svg --output build/data.json')
  .option('input', {
    alias: 'i',
    type: 'array',
    demandOption: true,
    describe: 'Input SVG files'
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    describe: 'Ouput JSON file. Defaults to stdout if no output file is provided.'
  })

// The `argv.input` array could contain globs (e.g. "**/*.svg").
const filePaths = globby.sync(argv.input)

if (filePaths.length === 0) {
  // eslint-disable-next-line no-console
  console.error('Input file(s) not found')
  process.exit(1)
}

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

if (argv.output) {
  fs.outputJsonSync(path.resolve(argv.output), iconsByName)
} else {
  process.stdout.write(JSON.stringify(iconsByName))
}
