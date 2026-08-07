# Octicons: Copilot Knowledge Base

> Enriched documentation designed to help GitHub Copilot self-serve common Octicons support questions. Compiled from existing docs at [primer.style/octicons](https://primer.style/octicons/), the [primer/octicons](https://github.com/primer/octicons) repo issue history, and team knowledge.

---

## Table of Contents

1. [What Are Octicons?](#what-are-octicons)
2. [Available Sizes](#available-sizes)
3. [How to Use Octicons (Code)](#how-to-use-octicons-code)
4. [Coloring & Fill Behavior](#coloring--fill-behavior)
5. [Accessibility](#accessibility)
6. [Common Issues & Troubleshooting](#common-issues--troubleshooting)
7. [Figma ↔ Code Sync](#figma--code-sync)
8. [When You Can't Find an Icon](#when-you-cant-find-an-icon)
9. [Design Guidelines Summary](#design-guidelines-summary)
10. [Usage Guidelines Summary](#usage-guidelines-summary)
11. [Contributing (GitHub Staff)](#contributing-github-staff)
12. [Package & Bundler Reference](#package--bundler-reference)
13. [When to Escalate to a Human](#when-to-escalate-to-a-human)
14. [Using Octicons in Plain HTML/CSS](#using-octicons-in-plain-htmlcss-non-framework)
15. [Downloading & Using SVG Files Directly](#downloading--using-svg-files-directly)
16. [Framework-Specific Notes](#framework-specific-notes)
17. [Licensing](#licensing)

---

## What Are Octicons?

Octicons are GitHub's scalable icon set, handcrafted as SVGs. They are the **system icons** used across GitHub's UI and are available for use in React, Rails, and raw SVG contexts.

- **Source of truth**: [github.com/primer/octicons](https://github.com/primer/octicons)
- **Browsable gallery**: [primer.style/octicons](https://primer.style/octicons/)
- **Figma**: Available via the Primer Octicons Figma library (GitHub staff)
- **npm**: `@primer/octicons-react` (React), `@primer/octicons` (SVG/JS)
- **Ruby**: `primer_view_components` gem

---

## Available Sizes

Octicons are designed at specific sizes and **must not be scaled**:

| Size | Usage |
|------|-------|
| **12px** | Special condensed UI contexts only (see below) |
| **16px** | Default size for most UI contexts |
| **24px** | Larger touchpoints, prominent UI elements |
| **48px** | Marketing/display contexts |
| **96px** | Marketing/display contexts |

### 12px Icons (restricted set)

Only these icons exist at 12px — use them only in condensed UI:

- `alert-fill-12` — Cautionary/attention messaging
- `check-circle-fill-12` — Success/complete messaging
- `no-entry-fill-12` — Blocked/ending state
- `x-circle-fill-12` — Error messaging
- `chevron-down-12` — Collapsible section open
- `chevron-right-12` — Collapsible section closed

**Important**: Never resize an icon. The 16px and 24px versions have different stroke proportions optimized for their size. Scaling a 16px icon to 24px will produce incorrect stroke widths.

---

## How to Use Octicons (Code)

### React

```bash
npm install @primer/octicons-react
```

```jsx
import { ArrowRightIcon } from '@primer/octicons-react'

// Basic usage (defaults to 16px)
<ArrowRightIcon />

// Explicit size
<ArrowRightIcon size={24} />

// With accessible label (only when icon conveys meaning alone)
<ArrowRightIcon aria-label="Next step" />
```

**Icon naming in React**: Icons use PascalCase with `Icon` suffix. The name maps from the kebab-case SVG name:
- `arrow-right` → `ArrowRightIcon`
- `git-pull-request` → `GitPullRequestIcon`
- `check-circle-fill` → `CheckCircleFillIcon`

### Rails

```ruby
# Gemfile
gem "primer_view_components"
```

```erb
<%= render(Primer::Beta::Octicon.new(:"arrow-right")) %>
<%= render(Primer::Beta::Octicon.new(:"arrow-right", size: :medium)) %>
<%= render(Primer::Beta::Octicon.new(:"alert-fill", "aria-label": "Warning")) %>
```

**Size tokens in Rails**: `:xsmall` (12px), `:small` (16px, default), `:medium` (24px)

### Raw SVG

SVGs are available at:
- npm package: `@primer/octicons` → `build/svg/` directory
- GitHub repo: `primer/octicons` → `icons/` directory (source)

---

## Coloring & Fill Behavior

### How It Works

Octicons use `currentColor` as their fill by default. This means:

1. The icon **inherits the text color** of its parent element
2. Change the parent's `color` CSS property to change the icon color
3. This works automatically across light/dark themes

### Recommended Approach

```jsx
// React: Wrap in a colored container
<span style={{ color: 'var(--fgColor-attention)' }}>
  <AlertFillIcon />
</span>
```

```erb
<!-- Rails: Use Primer color utility class -->
<span class="color-fg-attention">
  <%= render Primer::Beta::Octicon.new(:"alert-fill") %>
</span>
```

### The `fill` Prop (High-Specificity Override)

Use **only when inheritance doesn't work** for your context:

```jsx
<AlertFillIcon fill="var(--fgColor-attention)" />
```

Always use CSS variables from [Primer Primitives](https://primer.style/product/primitives/color/) — never hardcode hex colors — so icons adapt to theme changes.

### ⚠️ Common Pitfall: `fill="currentColor"` on `<path>` Elements

**Issue**: Some icons have `fill="currentColor"` set directly on their `<path>` elements. When this happens, applying `fill="red"` (or any color) to the outer `<svg>` element **will not work** because the path-level fill has higher specificity.

**Why this happens**: The SVG spec dictates that a `fill` attribute on a child element overrides the parent's `fill`. The `currentColor` keyword resolves to the computed `color` property of the element, not the parent's `fill`.

**Solutions**:
1. **Best**: Set the `color` CSS property on the icon's container — `currentColor` will resolve to it
2. **Alternative**: Use CSS to target paths directly: `svg path { fill: red !important; }`
3. **If you own the SVG**: Remove `fill="currentColor"` from the `<path>` — the path will inherit from the `<svg>` element's fill

**Related issues**: [#1222](https://github.com/primer/octicons/issues/1222), [#1215](https://github.com/primer/octicons/pull/1215)

---

## Accessibility

### Rules

| Scenario | What to do |
|----------|------------|
| Icon is decorative (text nearby explains it) | Do nothing — component auto-adds `aria-hidden="true"` |
| Icon alone conveys meaning | Add `aria-label` with a text description |
| Interactive icon-only button | Use `IconButton` component (not raw icon) |

### Color Contrast

Icons that convey meaning must have **≥ 3:1 contrast ratio** against their background. Use [Primer functional foreground colors](https://primer.style/product/primitives/color/#foreground) to ensure this.

### Predefined Color Assignments

These icons have **fixed semantic colors** — don't change them unless on colored backgrounds:

| Icon | Color Variable | Meaning |
|------|---------------|---------|
| `info` | `fg.accent` | Important information |
| `check` | `fg.success` | Success/positive |
| `x` | `fg.danger` | Error/danger |
| `alert` | `fg.attention` | Warning |
| `issue-opened` | `fg.success` | Open issue |
| `issue-closed` | `fg.done` | Closed/done issue |
| `git-pull-request` | `fg.success` | Open PR |
| `git-pull-request-closed` | `fg.danger` | Closed (not merged) PR |
| `git-merge` | `fg.done` | Merged PR |

---

## Common Issues & Troubleshooting

### "My icon color isn't changing"

**Cause**: The SVG path has `fill="currentColor"` which overrides the SVG-level fill.

**Fix**: Set `color` on the parent element instead of `fill` on the `<svg>`. See [Coloring & Fill Behavior](#coloring--fill-behavior) above.

### "Icon looks different in Figma vs code"

**Cause**: Figma library and npm package may be at different versions, or the icon was recently updated.

**Fix**: Check the latest release of `@primer/octicons-react` on npm. The Figma library is the design source-of-truth; if code doesn't match, file an issue at [primer/octicons](https://github.com/primer/octicons/issues).

**Related issues**: [#973](https://github.com/primer/octicons/issues/973), [#1068](https://github.com/primer/octicons/issues/1068)

### "ESM import errors / module resolution issues"

**Cause**: Some bundlers (especially with strict ESM) need explicit file extensions in imports.

**Known issues**:
- TypeScript `.d.ts` files missing extensions for ESM ([#1018](https://github.com/primer/octicons/issues/1018))
- Incorrect ESM exports in older versions ([#1006](https://github.com/primer/octicons/issues/1006))

**Fix**: Ensure you're on the latest version of `@primer/octicons-react`. If using strict ESM, you may need bundler configuration to resolve `.js` extensions.

### "Icon is not centered / alignment is off"

**Cause**: Octicons are designed for optical alignment, not mathematical centering. Some icons may appear slightly off-center by design.

**Fix**: If an icon appears genuinely misaligned (not just optically adjusted), check the SVG viewBox and file a bug. Related: [#915](https://github.com/primer/octicons/issues/915), [#737](https://github.com/primer/octicons/issues/737)

### "SVG won't open in Illustrator / is malformed"

**Cause**: Line endings or encoding issues, particularly on Windows.

**Fix**: Re-export from the source Figma file, or convert line endings. Related: [#802](https://github.com/primer/octicons/issues/802)

### "Build/dependency conflicts"

**Fix**: Always use the latest version. If you encounter dependency tree conflicts, try:
```bash
npm install @primer/octicons-react@latest --legacy-peer-deps
```

### "Icon renders incorrectly on iOS/macOS (xcasset bundles)"

**Cause**: Some SVG features aren't fully supported in Apple's asset catalog rendering.

**Fix**: Simplify SVG paths or use the PNG rasterization approach for native mobile. Related: [#866](https://github.com/primer/octicons/issues/866)

---

## Figma ↔ Code Sync

### Source of Truth Hierarchy

1. **Figma** (Primer Octicons library) — design source
2. **`/icons` directory** in `primer/octicons` repo — SVG source
3. **npm packages** — built/published output

### How New Icons Get to Code

1. Designer creates icon in Figma following design guidelines
2. Uses [Octicons Push plugin](https://www.figma.com/community/plugin/825432045044458754/Octicons-Push) to create a PR
3. PR reviewed by icon requestor + octicons maintainer
4. Merged → released via Changesets → published to npm/rubygems

### Reporting Discrepancies

If Figma and code don't match, open an issue at [primer/octicons](https://github.com/primer/octicons/issues) with:
- Which icon is affected
- Screenshot from Figma vs rendered output
- Version of the npm package you're using

---

## When You Can't Find an Icon

### Decision Tree

1. **Search the gallery**: [primer.style/octicons](https://primer.style/octicons/) — try synonyms and related terms
2. **Check keywords**: Icons have keyword aliases (defined in `keywords.json` in the repo)
3. **Use an existing similar icon**: Many concepts can be represented by existing icons
4. **Consider if you actually need an icon**: Text alone may be clearer for complex/abstract concepts
5. **For user-customizable contexts**: Use **emoji**, not Octicons (see Usage Guidelines)
6. **Request a new icon** (GitHub staff): Use the [icon request template](https://github.com/github/primer/issues/new?assignees=&labels=octicon%2C+request%2C+needs+triage&template=02-icon-request.md) in `github/primer`
7. **External contributors**: Open a [feedback issue](https://github.com/primer/octicons/issues/new/choose) describing your use case

### Icons Are Not for User-Selectable Content

Octicons are **system icons** — they represent fixed UI concepts. If users need to pick icons for labels, categories, or personal items, use **emoji** instead. Using Octicons as user-selectable creates confusion (e.g., a user picking `issue-closed` for an "In progress" label).

---

## Design Guidelines Summary

For designers creating or evaluating icons:

| Property | Specification |
|----------|--------------|
| Grid sizes | Always create 16px AND 24px versions |
| Stroke width | 1.5px (both sizes) |
| Caps & joins | Round |
| Corner radius | 1px (general), 0.25px (small filled elements) |
| Gaps (overlapping objects) | 1px |
| Gaps (modifier elements) | 1.5px |
| Perspective | 2D (unless depth adds meaning) |
| Pixel alignment | Align outer edges to pixel boundaries |
| Arrowheads | Line style (filled only when no room) |

### When to Create 12px

Only when there's a specific use case where a 16px icon physically cannot fit. 12px icons are special and should be rare.

---

## Usage Guidelines Summary

### Icon State Pairs

Use these predefined pairs for on/off states — don't invent your own:

| On State | Off State | Context |
|----------|-----------|---------|
| `heart-fill` | `heart` | Sponsoring |
| `star-fill` | `star` | Starred |
| `check-circle` | `x-circle-fill` | Pass/Fail |
| `file-directory-open-fill` | `file-directory-fill` | Directory open/closed |
| `bell` | `bell-slash` | Subscribe/Unsubscribe |
| `bookmark` | `bookmark-slash` | Save/Unsave |
| `eye` | `eye-closed` | Watch/Unwatch |
| `cloud` | `cloud-offline` | Online/Offline |

**Rules**:
- "Off" states use the **slash** variant (not filled)
- Filled variants represent the **active/on** state
- Never create ad-hoc pairs that deviate from this pattern

---

## Contributing (GitHub Staff)

Octicons contributions are **currently limited to GitHub staff** and only for icons used in GitHub UI.

### Process

1. Submit request via [icon request template](https://github.com/github/primer/issues/new?assignees=&labels=octicon%2C+request%2C+needs+triage&template=02-icon-request.md)
2. Request triaged by Octicons maintainer team
3. Design work happens in Figma
4. PR created via Octicons Push plugin or manual SVG
5. Review requires: stakeholder approval + 1 octicons maintainer designer
6. Merged and released via Changesets

### For External Users

External contributions are not accepted for new icons. You can:
- File [bug reports](https://github.com/primer/octicons/issues/new/choose) for existing icons
- Submit [feedback](https://github.com/primer/octicons/issues/new/choose) for icon requests
- Use SVGs from the repo directly in your own projects (MIT licensed)

---

## Package & Bundler Reference

### Packages

| Package | Registry | Contents |
|---------|----------|----------|
| `@primer/octicons` | npm | SVG data + JS helpers |
| `@primer/octicons-react` | npm | React components |
| `primer_view_components` | RubyGems | Rails view components (includes Octicons) |

### Import Patterns

```jsx
// Named import (tree-shakeable) — RECOMMENDED
import { SearchIcon } from '@primer/octicons-react'

// If you need the raw SVG data
import octicons from '@primer/octicons'
const searchSvg = octicons.search.toSVG()
```

### Version Compatibility

- React components require React 16.8+ (hooks)
- The package uses `React.forwardRef()` (since ~v19+)
- `defaultProps` was removed to avoid React 18.3+ deprecation warnings

### Tree-Shaking

Named imports from `@primer/octicons-react` are tree-shakeable. Avoid importing the entire module:

```jsx
// ✅ Good — only bundles SearchIcon
import { SearchIcon } from '@primer/octicons-react'

// ❌ Bad — bundles everything
import * as Octicons from '@primer/octicons-react'
```

---

## Quick Reference: Common Icon Mappings

| Concept | Icon Name | Sizes |
|---------|-----------|-------|
| Repository | `repo` | 16, 24 |
| Private repo | `repo-locked` | 16, 24 |
| Issue (open) | `issue-opened` | 16, 24 |
| Issue (closed) | `issue-closed` | 16, 24 |
| Pull request | `git-pull-request` | 16, 24 |
| Merge | `git-merge` | 16, 24 |
| Commit | `git-commit` | 16, 24 |
| Branch | `git-branch` | 16, 24 |
| Search | `search` | 16, 24 |
| Settings/gear | `gear` | 16, 24 |
| Delete/trash | `trash` | 16, 24 |
| Add/create | `plus-circle` | 16, 24 |
| Close/dismiss | `x` | 16, 24 |
| Menu/hamburger | `three-bars` | 16, 24 |
| External link | `link-external` | 16, 24 |
| Copy | `copy` | 16, 24 |
| Edit/pencil | `pencil` | 16, 24 |
| GitHub logo | `mark-github` | 16, 24 |

---

## When to Escalate to a Human

Not all Octicons questions can be self-served. Here's guidance on when Copilot should **stop and route to a human maintainer**:

### 🔴 Always Escalate (Requires Human Decision)

| Scenario | Why | Route to |
|----------|-----|----------|
| **New icon requests** | Requires design review, UI context evaluation, and maintainer approval | [Icon request template](https://github.com/github/primer/issues/new?assignees=&labels=octicon%2C+request%2C+needs+triage&template=02-icon-request.md) (staff) or feedback issue |
| **Icon is rendering incorrectly in production** | May indicate a regression in the package build | File issue at [primer/octicons](https://github.com/primer/octicons/issues) |
| **Figma ↔ code mismatch confirmed** | Requires designer to update either source | Ping in #primer-octicons or file issue |
| **Licensing questions** | Legal implications — cannot give legal advice | Direct to MIT license file + legal team if needed |
| **Icon meaning/semantics debate** | Design language decisions belong to maintainers | #primer-octicons or design team |
| **Breaking changes after version upgrade** | May need a hotfix or release revert | File urgent issue + ping maintainers |
| **Accessibility violations in production** | Needs immediate design/engineering intervention | File issue with `a11y` tag |
| **Request to modify an existing icon's appearance** | Design review required | #primer-octicons channel |
| **Icons for use outside GitHub UI** (brand/marketing) | Brand guidelines apply | Refer to [brand.github.com](https://brand.github.com/) |

### 🟡 Escalate If Self-Service Fails

| Scenario | Try First | Escalate If |
|----------|-----------|-------------|
| Icon color not working | Check fill/currentColor guidance above | Still broken after applying fixes |
| Package import errors | Try latest version + bundler config | Persists across versions |
| Icon alignment looks off | Verify correct size variant is used | Confirmed pixel-level misalignment |
| Icon missing from package | Check version matches latest release | Icon exists in repo but not in build |
| Jekyll/CSS integration issues | Review deprecated APIs (CSS font approach is EOL) | No workaround available |

### 🟢 Copilot Can Fully Self-Serve

- How to install and import Octicons (React, Rails, raw SVG)
- How to change icon color/fill
- Which size to use and why not to resize
- Accessibility implementation (aria-label, decorative icons)
- Finding the right icon for a concept
- Understanding state pairs (on/off icon combinations)
- Design grid specifications
- Contribution process overview
- When to use emoji vs Octicons
- Tree-shaking and bundle optimization

---

## Using Octicons in Plain HTML/CSS (Non-Framework)

A frequently asked question with no dedicated doc section:

### Inline SVG (Recommended)

```html
<!-- Copy SVG directly from primer/octicons repo or primer.style/octicons gallery -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z..."></path>
</svg>
```

### Why There's No CSS Icon Font

Octicons **dropped CSS icon font support** after v4.x. The font approach had issues with rendering quality, accessibility, and file size. The supported approaches are:

1. **Inline SVG** (best quality + accessibility)
2. **React/Rails components** (if using those frameworks)
3. **`@primer/octicons` npm package** with the `.toSVG()` JS helper

The old `octicons.css` approach is **deprecated and unsupported**.

### Using with Sass/Less

There is no official Sass/Less integration. Use inline SVGs or the JS helpers to generate SVG markup.

---

## Downloading & Using SVG Files Directly

### Where to Get SVGs

1. **Gallery**: [primer.style/octicons](https://primer.style/octicons/) — click any icon to see SVG details
2. **Repo**: Clone `primer/octicons` and find source files in `/icons`
3. **npm**: Install `@primer/octicons` — built SVGs are in `build/svg/`

### Common Pitfalls with Raw SVGs

- **Windows line endings**: SVGs may not open correctly in Illustrator on Windows. Convert to LF line endings.
- **Fill is black by default**: Source SVGs have no fill (inherit) or `fill="currentColor"`. If you see black, that's `currentColor` resolving to the default text color.
- **ViewBox matters**: Always keep the `viewBox` attribute — it defines the coordinate system. Without it, the icon won't scale correctly.

---

## Framework-Specific Notes

### Angular

There is **no official Angular package**. Options:
1. Use `@primer/octicons` npm package and render SVGs via `innerHTML` (with sanitization)
2. Use inline SVGs directly in templates
3. CommonJS warnings in Angular 10+ are expected — the package doesn't ship pure ESM for all contexts

### Vue

No official Vue package. Use inline SVGs or create a wrapper component around the raw SVG data from `@primer/octicons`.

### React Native

No official React Native support. For mobile, consider:
- Using SVGs via `react-native-svg`
- Rasterizing to PNG for asset catalogs (note: some SVG features may not render correctly in iOS xcasset bundles)

### Web Components

No official Web Components package exists. Community implementations may be available but are not maintained by the Primer team.

---

## Licensing

Octicons are released under the **MIT License**. This means:

- ✅ You can use them in commercial projects
- ✅ You can modify them
- ✅ You can distribute them
- ✅ You must include the MIT license notice
- ❌ No warranty is provided

The MIT license file is in the [repo root](https://github.com/primer/octicons/blob/main/LICENSE).

**Note**: The GitHub logo (`mark-github`, `logo-github`) icons are subject to [GitHub's brand guidelines](https://brand.github.com/) in addition to the MIT license. Using them implies representing GitHub itself.

---

## Links & Resources

- **Icon Gallery**: https://primer.style/octicons/
- **Design Guidelines**: https://primer.style/octicons/design-guidelines
- **Usage Guidelines**: https://primer.style/octicons/usage-guidelines
- **Code Reference**: https://primer.style/octicons/code
- **GitHub Repo**: https://github.com/primer/octicons
- **Contributing**: https://github.com/primer/octicons/blob/main/CONTRIBUTING.md
- **Primer Primitives (Colors)**: https://primer.style/product/primitives/color/
- **Icon Request (Staff)**: https://github.com/github/primer/issues/new?assignees=&labels=octicon%2C+request%2C+needs+triage&template=02-icon-request.md
