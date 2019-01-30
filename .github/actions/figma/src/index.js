'use strict';
const execa = require('execa')
const got = require('got')
const PQueue = require('p-queue')
const {
  ensureDir,
  removeSync,
  writeFile
} = require('fs-extra')
const {
  join,
  resolve
} = require('path')

class FigmaExport {
  constructor(options) {
    this.options = options
  }

  export() {
    console.log(`Exporting Figma assets to ${this.options.arguments.outputDir}`)
  }
}

module.exports = {
  FigmaExport: FigmaExport
}
