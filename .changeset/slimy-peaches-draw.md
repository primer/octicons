---
"@primer/octicons": major
---

Save file-directory-32.svg, file-directory-fill-32.svg

This patch fixes two problems:
- We're adding a non-filled `file-directory` icon to the set.
- We're fixing a problem where the 16px and 24px versions of the `file-directory` icons were mismatched between `fill` and `non-fill` versions of the icon.

**THIS IS A BREAKING CHANGE** and will require re-linking all the `file-directory` icon references to `file-directory-fill`
