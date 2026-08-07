import {defineConfig} from 'rolldown/config'
import babel from '@rolldown/plugin-babel'
import {dts} from 'rolldown-plugin-dts'
import packageJson from './package.json' with {type: 'json'}

const external = [
  ...Object.keys(packageJson.peerDependencies ?? {}),
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.devDependencies ?? {}),
].map(name => new RegExp(`^${name}(/.*)?`))

export default defineConfig({
  input: ['./src/generated/index.ts'],
  external,
  plugins: [
    dts({
      emitDtsOnly: false,
      oxc: false,
      sourcemap: false,
      tsconfig: 'tsconfig.build.json',
    }),
    babel({
      presets: [
        '@babel/preset-typescript',
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
      ],
      plugins: [
        [
          'babel-plugin-react-compiler',
          {
            target: '18',
          },
        ],
        '@babel/plugin-transform-runtime',
      ],
      runtimeVersion: packageJson.dependencies['@babel/runtime'],
    }),
  ],
  output: {
    dir: './dist',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
})
