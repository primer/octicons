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
  define: {
    global: 'globalThis',
    'process.env': '{}',
  },
  plugins: [transformJsxInJs(), react({babel: {presets: ['@babel/preset-react']}})],
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
    include: ['src/__tests__/*.jsx'],
    typecheck: {
      enabled: true,
      tsconfig: './ts-tests/tsconfig.json',
    },
  },
})
