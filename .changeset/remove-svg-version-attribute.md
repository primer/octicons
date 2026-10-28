---
'@primer/octicons': patch
octicons_gem: patch
---

Remove obsolete `version="1.1"` attribute from rendered SVGs. SVG 2 removed it and browsers never used it; rendering is unchanged.
