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
    name: 'octicons-react',
    root: fileURLToPath(new URL('.', import.meta.url)),
    environment: 'jsdom',
    globals: true,
    include: ['__tests__/*.test.js', 'src/__tests__/*.js']
  }
})
