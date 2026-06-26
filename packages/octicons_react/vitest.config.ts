import react from '@vitejs/plugin-react'
import {transformWithOxc} from 'vite'
import {defineConfig} from 'vitest/config'

function jsxInJavaScript() {
  return {
    name: 'jsx-in-javascript',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('/src/') || !id.endsWith('.js')) {
        return null
      }

      return transformWithOxc(code, id, {
        lang: 'jsx'
      })
    }
  }
}

export default defineConfig({
  plugins: [jsxInJavaScript(), react({jsxRuntime: 'classic'})],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  test: {
    name: '@primer/octicons-react',
    environment: 'jsdom',
    globals: true,
    include: ['__tests__/**/*.ts', 'src/__tests__/**/*.tsx'],
    setupFiles: ['./vitest.setup.ts']
  }
})
