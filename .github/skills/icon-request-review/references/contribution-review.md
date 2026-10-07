# Contribution review

Use this reference when preparing or reviewing a pull request that adds,
updates, or renames an Octicon.

## Connect the contribution to the request

Confirm that the pull request includes:

- The linked icon request issue
- The use case and relevant timeline
- The canonical name and intended natural sizes
- A direct Figma component link for each natural size
- A rendered preview with descriptive alt text
- Any intentional single-size coverage
- Any compatibility behavior for a rename

The original requestor and at least one designer on the Octicons maintainer
team must approve the contribution. A maintainer approval does not replace
stakeholder confirmation that the icon works in the requested product context.

## Create the pull request from Figma

Use the Octicons Push plugin after completing the Figma section of
`docs/add-octicon-checklist.md`:

1. Select every intended natural-size icon frame and confirm that all strokes
   are outlined.
2. Open the Octicons Push plugin.
3. Select an existing branch or create a contribution branch.
4. Commit the selected icons through the plugin.
5. Open the pull request link from the plugin and complete the repository pull
   request template.
6. Link the pull request from the icon request issue.

For a rename, update the existing Figma components in place before export.
Inspect the exported filenames after the plugin runs because it does not remove
old filenames automatically. Resolve obsolete source filenames and
`icon-metadata.json` aliases before requesting review.

## Review source and naming

- Confirm source files use the canonical base name plus exactly one size
  suffix, such as `alert-16.svg` and `alert-24.svg`.
- Confirm every intended natural size is present. Require a documented reason
  for intentional single-size coverage.
- Compare the glyph with any published icon that uses the same name. A name
  match alone does not establish compatibility.
- Confirm `keywords.json` uses the canonical base name and useful search terms.
- Confirm related icon families use established prefixes and modifiers.
- Re-run the review after the Optimize SVGs workflow commits automated changes.

For a rename:

- Preserve existing Figma component identities.
- Use canonical source filenames for the new name.
- Define old package names as compatibility aliases in `icon-metadata.json`.
- Confirm alias sizes and deprecation status match the intended behavior.
- Reject source filenames that collide with aliases.

## Review generated package changes

Run builds through Turborepo from the repository root so metadata, aliases, and
protected geometry checks apply:

```shell
npx turbo run build
```

Confirm generated outputs expose the expected icon in the JavaScript, React,
React Symbols, and Styled Octicons packages. Added or renamed React exports
must update:

`lib/octicons_react/__tests__/__snapshots__/public-api.test.ts.snap`

Do not accept unrelated generated changes. Investigate missing exports,
unexpected removals, changed aliases, or broad SVG rewrites.

## Review the changeset

Load and follow the repository's `changesets` skill. For a new icon, verify that
its package selection, semantic version impact, linked Ruby release behavior,
and user-focused description satisfy that skill and the current pull request
template. Do not recreate those rules in this reference.

## Review automated checks

Use `.github/workflows/` as the source of truth. An icon contribution normally
exercises:

- JavaScript lint, package lint, type checks, and tests
- Repository and workspace builds
- Ruby lint and tests against built icon assets
- npm package build and pack validation
- Changeset presence
- SVG optimization for changed icons

Use repository-root Turborepo commands for local JavaScript validation:

```shell
npx turbo run lint
npx turbo run lint:npm
npx turbo run type-check
npx turbo run test
```

Confirm GitHub checks are green before **Ready for maintainer approval** or
**Ready to merge**. If a check cannot run locally, name the missing check
instead of treating it as passed.

## Review the pull request, not only the files

Confirm the current `.github/pull_request_template.md` remains complete. Report
findings when:

- The issue or Figma evidence is missing
- Preview alt text does not describe the artwork
- Names or natural sizes disagree across Figma, SVGs, keywords, exports,
  snapshots, or release notes
- A new icon lacks the four-package minor changeset
- Rename compatibility is missing or ambiguous
- The requestor or an Octicons maintainer has not been requested for review

Use **Ready for requestor review** after the contribution and automated checks
are complete. Use **Ready for maintainer approval** only after the requestor
approves. Use **Ready to merge** only after the requestor and at least one
designer on the Octicons maintainer team approve.

Post-publication Primer Docs monitoring can detect suspected naming drift,
missing categories, and duplicate component names. It does not block this pull
request, compare artwork between sizes, or prove Figma and npm SVG path parity.
