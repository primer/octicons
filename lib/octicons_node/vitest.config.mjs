import {defineProject} from 'vitest/config'

export default defineProject({
  test: {
    name: 'octicons-node',
    globals: true,
    include: ['tests/*.js'],
  },
})
