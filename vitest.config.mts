import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'octicons',
          globals: true,
          include: ['tests/*.ts'],
        },
      },
      './lib/octicons-react-symbols/vitest.config.ts',
      './lib/octicons_node/vitest.config.mts',
      './lib/octicons_react/vitest.config.mts',
      './lib/octicons_react/vitest.browser.config.mts',
      './lib/octicons_styled/vitest.config.mts',
    ],
  },
})
