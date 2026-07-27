'use strict'

module.exports = {
  moduleNameMapper: {
    '^styled-components$': require.resolve('styled-components')
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(mjs|cjs|js|jsx)$': require.resolve('babel-jest')
  }
}
