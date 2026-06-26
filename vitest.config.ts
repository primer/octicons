import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['vitest.root.config.ts', 'packages/*/vitest.config.ts']
  }
})
