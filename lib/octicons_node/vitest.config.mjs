import {fileURLToPath} from 'node:url'
import {defineProject} from 'vitest/config'

export default defineProject({
  test: {
    name: 'octicons-node',
    root: fileURLToPath(new URL('.', import.meta.url)),
    globals: true,
    include: ['tests/*.js']
  }
})
