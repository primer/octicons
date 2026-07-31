import {defineProject} from 'vitest/config'

export default defineProject({
  test: {
    name: 'octicons-react',
    globals: true,
    include: ['__tests__/*.test.js'],
    typecheck: {
      enabled: true,
      tsconfig: './ts-tests/tsconfig.json',
    },
  },
})
