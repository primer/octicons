import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'octicons',
          globals: true,
          include: ['tests/*.js'],
        },
      },
      './lib/octicons_node/vitest.config.mjs',
      './lib/octicons_react/vitest.config.mjs',
      './lib/octicons_react/vitest.browser.config.mjs',
      './lib/octicons_react_symbols/vitest.browser.config.mjs',
      './lib/octicons_styled/vitest.config.mjs',
    ],
  },
})
