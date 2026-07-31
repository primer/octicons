import react from '@vitejs/plugin-react'
import {playwright} from '@vitest/browser-playwright'
import {transformWithOxc} from 'vite'
import {defineProject} from 'vitest/config'

function transformJsxInJs() {
  return {
    name: 'transform-jsx-in-js',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('/src/') && id.endsWith('.js')) {
        return transformWithOxc(code, id, {lang: 'jsx'})
      }
    },
  }
}

export default defineProject({
  plugins: [transformJsxInJs(), react({babel: {presets: ['@babel/preset-react']}})],
  optimizeDeps: {
    include: [
      '@testing-library/jest-dom',
      '@testing-library/react',
      'react',
      'react-dom',
      'react-dom/client',
      'react-dom/test-utils',
    ],
    noDiscovery: true,
  },
  test: {
    name: 'octicons-react-browser',
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{browser: 'chromium'}],
    },
    globals: true,
    include: ['src/__tests__/*.jsx'],
  },
})
