'use strict'

module.exports = {
  moduleNameMapper: {
    'octicons_react/dist/index\\.esm$': '<rootDir>/../octicons_react/dist/index.umd.js'
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(mjs|cjs|js|jsx)$': require.resolve('babel-jest')
  }
}
