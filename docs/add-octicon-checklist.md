# Add an octicon

Use this checklist to add a new/updated octicon to the Figma library and the Octicons package. Read the [contributing guidelines](/CONTRIBUTING.md) for more information on the entire contribution process.

## Figma

- [ ] Remove white background from icon frame
- [ ] Outline all strokes of vector shape
- [ ] Union shapes
- [ ] Merge/flatten vector (cmd+e)
- [ ] Remove any unused points
- [ ] Rename vector layer "Icon"
- [ ] Vector layer color set to `text/primary`
- [ ] Name each icon frame with the canonical icon name
  - Note: Octicon names should be written lower case and use `-` to separate descriptors
  - Note: Follow established family prefixes, such as `issue-*` and `git-pull-request-*`
  - Note: Use the exact same base name for every natural size
  - Note: The 16px component uses the bare name; other sizes add one numeric suffix, such as `issue-opened-24`
- [ ] Check the Figma library and published package before reusing a name
  - Note: The same name must identify the same glyph; different artwork needs a distinct name
- [ ] If renaming, rename the existing components in place to preserve their node identities
- [ ] Copy/paste into [Octicons library file](https://www.figma.com/file/1ljgTFkT5NKNRfq5hw07JQ/Octicons?node-id=0%3A1)
- [ ] Convert the icons into components
- [ ] Place each component in the matching category frame on its size page
- [ ] Set constraints of vectors to Scale/Scale
  - Note: If adding multiple icons, use the ["All Constraints" plugin](https://www.figma.com/community/plugin/847224511609531534/All-Constraints) for bulk editing
- [ ] Add keywords to icon component
  - Note: All keywords begin with the search flag `icon: `
  - Note: Keywords should describe other metaphors that the icon can represent when searching
  - Example: The `bookmark` icon's keywords are "icon: favorite, save, bookmark"

## Octicons package

- [ ] Compare the glyph with any existing published icon of the same name; a matching name alone does not establish compatibility
- [ ] Use the [Octicons Push plugin](https://www.figma.com/community/plugin/825432045044458754/Octicons-Push) to create a pull request from Figma
- [ ] Confirm exported filenames use the canonical base name and exactly one size suffix
- [ ] Confirm every intended natural size is present and document intentional single-size coverage
- [ ] Add or update the canonical name in `keywords.json`
- [ ] For a rename, preserve the existing Figma component identity and define the old package name in `icon-metadata.json`
- [ ] Update the React public API snapshot for added or renamed exports
- [ ] Add one user-focused changeset for the icon change and select every affected package
  - Note: For a new icon, select `minor` for `@primer/octicons`, `@primer/octicons-react`, `@primer/octicons-react-symbols`, and `@primer/styled-octicons`
  - Note: `@primer/octicons-react-symbols` has an independent `0.x` version, so it must be selected explicitly
  - Note: Confirm that the changeset bot adds the linked `octicons_gem`, `octicons_helper`, and `jekyll-octicons` releases
  - Note: Do not add a separate changeset for generated files or snapshot updates
- [ ] Open created pull request in the browser and add details
  - Pull request should include:
    - [ ] Use case and relevant timeline
    - [ ] Canonical names and intended natural sizes
    - [ ] Screenshot with descriptive alt text
    - [ ] Link to icon request issue for tracking
    - [ ] Direct Figma component link for each natural size
    - [ ] Compatibility behavior or intentional single-size coverage
- [ ] Request reviewers
  - [ ] Original requestor (from issue)
  - [ ] Member of octicons team
- [ ] Submit pull request

## Automated monitoring

The weekly Primer Docs [`figma-categories`](https://github.com/github/primer-docs/blob/main/.github/workflows/figma-categories.yml) and [`figma-node-map`](https://github.com/github/primer-docs/blob/main/.github/workflows/figma-node-map.yml) workflows report suspected cross-size naming drift, missing Figma categories or component matches, and duplicate Figma component names.

These workflows provide monitoring after publication. They do not block the Octicons pull request, compare artwork between natural sizes, or prove Figma and npm SVG path parity. Complete every applicable check above before merging.
