import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    name: 'octicons',
    environment: 'node',
    include: ['tests/*.ts']
  }
})
