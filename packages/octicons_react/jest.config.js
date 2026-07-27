'use strict'

module.exports = {
  moduleNameMapper: {
    '^rollup$': require.resolve('rollup')
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(mjs|cjs|js|jsx)$': require.resolve('babel-jest')
  }
}
