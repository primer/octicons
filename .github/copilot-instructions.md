# Octicons — Copilot Instructions

> These instructions help GitHub Copilot provide accurate, context-aware answers about Octicons.

## What This Repo Is

This is the source repository for **Octicons** — GitHub's scalable icon set. It contains:
- Source SVGs in `/icons` (the design source of truth after Figma)
- Build output in `/build/svg/`
- npm packages: `@primer/octicons` (SVG data) and `@primer/octicons-react` (React components)
- Ruby gem integration via `primer_view_components`

## Key Facts Copilot Must Know

### Sizes
- Icons exist at **12px, 16px, and 24px** (plus 48/96 for marketing)
- 12px icons are a restricted set (only status fills + chevrons)
- **Never resize icons** — each size has optimized stroke proportions
- Default size is 16px

### Coloring
- Icons use `currentColor` by default — they inherit parent text color
- To change color: set `color` CSS property on the parent container
- The `fill` prop is a high-specificity override — use Primer CSS variables (`var(--fgColor-attention)`)
- If color isn't working, the `<path>` may have `fill="currentColor"` which overrides `<svg>` level fills. Fix: use CSS `color` on the container instead

### Accessibility
- Icons are **decorative by default** (auto `aria-hidden="true"`)
- Add `aria-label` ONLY when the icon alone conveys essential meaning
- For interactive icon-only buttons, use `IconButton` component
- Icons must have ≥ 3:1 contrast ratio against background

### React Usage
```jsx
import { SearchIcon } from '@primer/octicons-react'
<SearchIcon size={16} />
<SearchIcon aria-label="Search" />  // only if no adjacent text
```

### Rails Usage
```erb
<%= render(Primer::Beta::Octicon.new(:search)) %>
<%= render(Primer::Beta::Octicon.new(:search, size: :medium)) %>
```

### Icon Naming
- SVGs: kebab-case (`git-pull-request`)
- React: PascalCase + Icon suffix (`GitPullRequestIcon`)
- Rails: symbol (`:git-pull-request` or `:"git-pull-request"`)

### Predefined Semantic Colors (Do Not Change)
- `issue-opened` → `fg.success`
- `issue-closed` → `fg.done`
- `git-pull-request` → `fg.success`
- `git-pull-request-closed` → `fg.danger`
- `git-merge` → `fg.done`
- `alert` → `fg.attention`
- `info` → `fg.accent`
- `check` → `fg.success`
- `x` → `fg.danger`

### State Pairs (On/Off)
- `star` / `star-fill`
- `heart` / `heart-fill`
- `bell` / `bell-slash`
- `bookmark` / `bookmark-slash`
- `eye` / `eye-closed`
- "Off" states use slash variants, not filled

### CSS Icon Font
The CSS icon font approach (`octicons.css`) was **deprecated after v4.x**. It is not supported. Use inline SVGs or framework components.

### Licensing
MIT License. GitHub logo icons (`mark-github`, `logo-github`) are additionally subject to GitHub brand guidelines. Visual Studio Code logo icons (`vscode`) are additionally subject to [Visual Studio Code brand guidelines](https://code.visualstudio.com/brand).

## When to Recommend Human Escalation

Copilot should suggest contacting the Primer/Octicons team when:
- The user needs a **new icon** (design review required)
- An icon renders **incorrectly after upgrading** (possible regression)
- There's a confirmed **Figma vs code mismatch**
- The question involves **licensing for specific use cases**
- The user reports an **accessibility violation** in production
- The request involves **modifying an icon's visual design**
- The question is about **brand usage** of GitHub logos

Direct users to file issues at https://github.com/primer/octicons/issues or (for GitHub staff) the primer internal repo, https://github.com/github/primer.

## Common Troubleshooting

1. **"Color isn't applying"** → Check if `<path>` has `fill="currentColor"`. Use CSS `color` on parent instead of `fill` on `<svg>`.
2. **"Icon looks different than Figma"** → Check npm package version matches latest release.
3. **"ESM import errors"** → Update to latest `@primer/octicons-react`. Check bundler ESM config.
4. **"Can't find an icon"** → Search primer.style/octicons by synonyms. Check keywords.json in repo.
5. **"Icon alignment is off"** → Verify you're using the correct size variant (not scaling).
