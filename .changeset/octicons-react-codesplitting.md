---
"@primer/octicons-react": minor
---

Optimize `@primer/octicons-react` for codesplitting and tree-shaking. Each icon is now emitted as its own module and exposed via a `./*` subpath export, so icons can be dynamically imported and code-split (e.g. `import('@primer/octicons-react/AlertIcon')`). The generated icons are now finished `React.forwardRef` components built on a shared `renderOcticon` runtime instead of runtime `createIconComponent` factory calls. Existing `import {AlertIcon}` and `import * as Octicons` usage continues to work unchanged.
