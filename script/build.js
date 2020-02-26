#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const cheerio = require('cheerio')
const trimNewlines = require('trim-newlines')
const {argv} = require('yargs')
const flatMap = require('lodash.flatmap')

// TODO: Error handling
// TODO: Explain why we're using flatMap
const filepaths = flatMap(argv._, pattern => glob.sync(pattern))

const icons = filepaths.map(filepath => {
  const name = path.parse(filepath).name
  const svg = fs.readFileSync(path.resolve(filepath), 'utf8')
  const svgElement = cheerio.load(svg)('svg')
  const width = parseInt(svgElement.attr('width'))
  const height = parseInt(svgElement.attr('height'))
  const innerHtml = trimNewlines(svgElement.html()).trim()
  return {name, keywords: [], width, height, path: innerHtml}
})

fs.outputJsonSync(path.resolve(argv.output), icons)
