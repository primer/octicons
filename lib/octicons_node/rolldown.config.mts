import {defineConfig} from 'rolldown'

export default defineConfig([
  {
    input: 'index.ts',
    output: {
      file: 'index.js',
      format: 'esm',
    },
  },
  {
    input: 'index.ts',
    output: {
      file: 'index.cjs',
      format: 'cjs',
      exports: 'default',
    },
  },
])
