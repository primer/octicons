import {fileURLToPath} from 'node:url'
import react from '@vitejs/plugin-react'
import {defineProject} from 'vitest/config'

export default defineProject({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /\.jsx?$/,
    exclude: []
  },
  test: {
    name: 'octicons-styled',
    root: fileURLToPath(new URL('.', import.meta.url)),
    environment: 'jsdom',
    globals: true,
    include: ['src/__tests__/*.js']
  }
})
