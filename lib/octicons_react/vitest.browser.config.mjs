import react from '@vitejs/plugin-react'
import {defineProject} from 'vitest/config'

export default defineProject({
  plugins: [react({babel: {presets: ['@babel/preset-react']}})],
  optimizeDeps: {
    include: ['@testing-library/jest-dom', '@testing-library/react'],
    noDiscovery: true
  },
  test: {
    name: 'octicons-react-browser',
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{browser: 'chromium'}]
    },
    globals: true,
    include: ['src/__tests__/*.js']
  }
})
