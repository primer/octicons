const {
  resolve
} = require('path')

const pkg = require(resolve(process.cwd(), 'package.json'))

console.log("*******")
console.log("THIS IS THE NEW PACKAGE AFTER PREVIOUS VERSION ACTION")
console.log(pkg)
console.log("*******")
