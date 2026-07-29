import github from 'eslint-plugin-github'
import globals from 'globals'

const {browser, internal, react, recommended, typescript} = github.getFlatConfigs()
const javascriptFiles = ['**/*.{js,mjs,cjs,jsx}']
const typescriptFiles = ['**/*.{ts,mts,cts,tsx}']
const configFiles = ['**/*.config.{js,mjs,cjs,ts,mts,cts}']
const declarationFiles = ['**/*.d.{ts,mts,cts}']
const nodeFiles = ['tests/**/*.js', 'lib/octicons_node/{index.js,tests/**/*.js}']
const reactFiles = ['lib/octicons_{react,styled}/{pages,script,src,ts-tests}/**/*.{js,mjs,jsx,ts,tsx}']
const testFiles = ['**/{__tests__,tests,ts-tests}/**/*.{js,mjs,cjs,jsx,ts,tsx}']
const typeTestFiles = ['**/ts-tests/**/*.{ts,mts,cts,tsx}']
const lintFiles = [...javascriptFiles, ...typescriptFiles]

export default [
  {ignores: ['**/__generated__/**', '**/{build,coverage,dist}/**', '**/.{cache,next}/**', 'public/**', 'vendor/**']},
  {...recommended, files: lintFiles},
  ...typescript.map(config => ({...config, files: typescriptFiles})),
  {...internal, files: nodeFiles},
  {...browser, files: reactFiles},
  {...react, files: reactFiles},
  {
    files: lintFiles,
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.commonjs,
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      'github/no-then': 'off',
    },
  },
  {
    files: ['tests/**/*.js'],
    rules: {
      'eslint-comments/no-use': 'off',
    },
  },
  {
    files: ['lib/octicons_node/{index.js,tests/**/*.js}'],
    rules: {
      'i18n-text/no-en': 'off',
      'import/extensions': 'off',
      'import/no-commonjs': 'off',
    },
  },
  {
    files: configFiles,
    rules: {
      'github/filenames-match-regex': 'off',
      'import/extensions': 'off',
      'import/no-commonjs': 'off',
      'import/no-named-as-default': 'off',
      'import/no-unresolved': 'off',
    },
  },
  {
    files: testFiles,
    rules: {
      'import/extensions': 'off',
      'import/no-commonjs': 'off',
      'import/no-dynamic-require': 'off',
      'import/no-named-as-default': 'off',
      'import/no-namespace': 'off',
    },
  },
  {
    files: declarationFiles,
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'import/extensions': 'off',
      'import/no-namespace': 'off',
    },
  },
  {
    files: reactFiles,
    rules: {
      'github/a11y-aria-label-is-well-formatted': 'off',
      'github/filenames-match-regex': 'off',
      'import/named': 'off',
      'no-unused-vars': ['error', {varsIgnorePattern: '^React$'}],
    },
  },
  {
    files: ['**/script/**/*.js'],
    rules: {
      'import/extensions': 'off',
      'import/no-commonjs': 'off',
      'import/no-nodejs-modules': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['lib/octicons_react/script/**/*.js'],
    rules: {
      'no-shadow': 'off',
    },
  },
  {
    files: ['lib/octicons_{react,styled}/src/__tests__/**/*.js'],
    rules: {
      'github/unescaped-html-literal': 'off',
      'i18n-text/no-en': 'off',
    },
  },
  {
    files: typeTestFiles,
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },
]
