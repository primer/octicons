'use strict'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
<<<<<<< HEAD
    '@babel/preset-react',
  ],
  env: {
    production: {
      presets: ['next/babel'],
    },
  },
=======
    '@babel/preset-react'
  ]
>>>>>>> origin/main
}
