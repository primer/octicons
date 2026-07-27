'use strict'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-react'
  ],
  env: {
    production: {
      presets: ['next/babel']
    }
  }
}
