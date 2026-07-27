import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vitest/config'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'octicons',
          root,
          globals: true,
          include: ['tests/*.js']
        }
      },
      './lib/octicons_node/vitest.config.mjs',
      './lib/octicons_react/vitest.config.mjs',
      './lib/octicons_styled/vitest.config.mjs'
    ]
  }
})
