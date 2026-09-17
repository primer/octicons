---
name: changesets
description: "Use when a pull request changes a package's public API. Covers affected packages, semantic version impact, file format, and user-focused release notes."
---

# Changesets

This repository uses [Changesets](https://github.com/changesets/changesets) to
version packages and generate changelogs. Add a changeset whenever a pull
request changes the public API of a published package.

A changeset records:

1. Every published package affected by the public API change
2. The semantic version impact (`patch`, `minor`, or `major`) for each package
3. A concise description of the change for users of the affected packages

## When a changeset is required

Add a changeset for consumer-facing changes such as:

- Adding, removing, or renaming an icon
- Changing an icon's rendered appearance or behavior
- Adding, removing, or changing an export
- Changing public JavaScript, React, CSS, or TypeScript APIs
- Fixing behavior that users experience through a package's public API

Changes that do not affect a published package's public API, such as
documentation, tests, internal refactors, or CI configuration, do not need a
changeset. Add the `skip changeset` label to those pull requests.

## Identify affected packages

Review the change from the perspective of users of each package. For a new
icon, select the linked npm packages whose generated public APIs change:

- `@primer/octicons`
- `@primer/octicons-react`
- `@primer/styled-octicons`

Do not select a package only because its internal source or build process
changed. Select it when users of that package will observe the change.

`@primer/octicons-react-symbols` keeps an independent `0.x` version and sits
outside the linked release group. Until the repository defines a standard
release policy for this package, confirm with a maintainer whether an icon
change should select it rather than treating it as part of the default set.

The Changesets workspace graph adds `octicons_gem`, `octicons_helper`, and
`jekyll-octicons` to a shared icon-data release. Confirm that the changeset bot
lists them, but do not select them solely because shared icon data changed.
Select a Ruby workspace directly when the pull request makes a Ruby-specific
public change.

## Choose the version impact

- `patch`: A backwards-compatible fix to existing public behavior or icon
  output
- `minor`: A backwards-compatible public API addition, such as a new icon or
  export, or a canonical rename that preserves the old name as a compatibility
  alias
- `major`: A breaking public API change, such as removing or renaming an icon
  or export without compatibility

Choose the impact independently for each affected package.

## Author a changeset

Run `npx changeset` and follow the prompts to select every affected package,
choose its version impact, and enter the description. Commit the generated
markdown file in `.changeset/` to the pull request branch.

Use one changeset for one user-facing change. Do not add a second changeset for
generated files, snapshots, or a follow-up that only completes the same public
API change.

To create one manually, add a uniquely named markdown file in `.changeset/`
with YAML frontmatter for all affected packages:

```markdown
---
'@primer/octicons': minor
'@primer/octicons-react': minor
'@primer/styled-octicons': minor
---

Add the accessibility icon for representing accessible experiences.
```

## Write for package users

The description is published in package changelogs and release notes. Write it
as communication to users of the library:

- Describe the public API change and its user-visible effect
- Use one or two concise sentences
- Name relevant icons, exports, or packages when that helps users understand
  the impact
- Use present tense and active voice
- Exclude implementation details, internal file names, test changes, and pull
  request process

Good:

```markdown
Add the `AccessibilityInsetIcon` export for representing accessible
experiences.
```

Avoid:

```markdown
Update the build script and generated files after adding a new SVG, including
snapshot changes.
```

The avoided example explains the implementation rather than the public API
change that users need to know about.
