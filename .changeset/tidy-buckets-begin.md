---
"@primer/octicons-react": patch
---

Add dual CJS/ESM support to `@primer/octicons-react`. The package now exposes both a CommonJS (`dist/index.cjs`) and an ESM (`dist/index.js`) entrypoint with proper `exports` conditions, fixing compatibility for CommonJS consumers in Node16+.
