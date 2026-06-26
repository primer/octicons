import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['vitest.root.config.mts', 'packages/*/vitest.config.mts']
  }
})
