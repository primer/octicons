'use strict'

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(mjs|cjs|js|jsx)$': require.resolve('babel-jest')
  }
}
