import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    name: '@primer/octicons',
    environment: 'node',
    include: ['tests/*.js']
  }
})
