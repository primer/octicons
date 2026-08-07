import react from '@vitejs/plugin-react'
import {playwright} from '@vitest/browser-playwright'
import {defineProject} from 'vitest/config'

export default defineProject({
  define: {
    global: 'globalThis',
    'process.env': '{}',
  },
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@styled-system/css',
      '@testing-library/jest-dom',
      '@testing-library/react',
      'jest-styled-components',
      'styled-components',
      'styled-system',
    ],
    noDiscovery: true,
  },
  test: {
    name: 'octicons-styled',
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{browser: 'chromium'}],
    },
    globals: true,
    include: ['src/__tests__/*.tsx'],
    typecheck: {
      enabled: true,
      tsconfig: './ts-tests/tsconfig.json',
    },
  },
})
