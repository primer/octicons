import react from '@vitejs/plugin-react'
import {playwright} from '@vitest/browser-playwright'
import {fileURLToPath} from 'node:url'
import {transformWithOxc, type Plugin} from 'vite'
import {defineProject} from 'vitest/config'

const transformGeneratedJsx = (): Plugin => ({
  name: 'transform-generated-jsx',
  enforce: 'pre',
  transform(code, id) {
    const filename = id.split('?')[0]
    if (!filename.includes('/src/__generated__/') || !filename.endsWith('.js')) {
      return null
    }

    return transformWithOxc(code, filename, {
      lang: 'jsx',
      jsx: {
        runtime: 'automatic',
      },
    })
  },
})

export default defineProject({
  plugins: [transformGeneratedJsx(), react()],
  resolve: {
    alias: {
      react: fileURLToPath(new URL('./node_modules/react', import.meta.url)),
      'react-dom': fileURLToPath(new URL('./node_modules/react-dom', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['@testing-library/jest-dom', '@testing-library/react'],
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
    include: ['src/__tests__/*.tsx'],
  },
})
