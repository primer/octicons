// Fixture for the code-splitting test: static dynamic imports of per-icon
// subpaths so Rollup emits one chunk per icon.
export function load(name) {
  switch (name) {
    case 'AlertIcon':
      return import('../../dist/icons/AlertIcon.js')
    case 'RepoIcon':
      return import('../../dist/icons/RepoIcon.js')
    default:
      return null
  }
}
