import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [react({jsxRuntime: 'classic'})],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  test: {
    name: '@primer/styled-octicons',
    environment: 'jsdom',
    globals: true,
    include: ['src/__tests__/**/*.tsx'],
    setupFiles: ['./vitest.setup.ts']
  }
})
