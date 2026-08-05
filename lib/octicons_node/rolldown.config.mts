import {defineConfig} from 'rolldown'

export default defineConfig([
  {
    input: 'index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm',
    },
  },
  {
    input: 'index.ts',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'default',
    },
  },
])
