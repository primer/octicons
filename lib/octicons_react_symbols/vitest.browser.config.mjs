import react from '@vitejs/plugin-react'
import {defineProject} from 'vitest/config'

export default defineProject({
  plugins: [react()],
  test: {
    name: 'octicons-react-symbols-browser',
    setupFiles: ['config/vitest/browser/setup.js'],
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{browser: 'chromium'}],
    },
    include: ['src/__tests__/*.tsx'],
  },
})
