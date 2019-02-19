#!/usr/bin/env node
const fs = require('fs')
console.log('Copying index.scss to build/build.css')
fs.copyFileSync('./index.scss', './build/build.css')
