---
name: icon-requests
description: 'Use when triaging a new Octicons icon request, recommending an existing icon, facilitating an icon design review, or reviewing an icon contribution pull request.'
---

# Icon requests and reviews

Guide an icon request from intake through recommendation, design review,
contribution, and release communication. Start with the request's actual use
case. A requested name or drawing does not establish that a new icon is needed.

## Choose the active phase

Load only the reference for the current task:

| Task                                                   | Reference                                                  |
| ------------------------------------------------------ | ---------------------------------------------------------- |
| Triage an issue or recommend an existing icon          | [Request triage](./references/request-triage.md)           |
| Review a metaphor, drawing, or Figma component         | [Design review](./references/design-review.md)             |
| Create or review an Octicons contribution pull request | [Contribution review](./references/contribution-review.md) |

For work that crosses phases, load the next reference only after completing the
current phase. Also use the repository's `changesets` skill when the work adds,
changes, renames, or removes a published icon.

## Establish the evidence

Identify the request issue, intended GitHub UI context, timeline, mocks or
drawings, Figma components, and contribution pull request. Ask for missing
information only when it prevents the current decision.

Before advancing the request, confirm that it comes from GitHub staff and that
the icon will be used in the GitHub UI. Octicons does not accept other icon
submissions. If either condition fails, report **Not eligible for Octicons**. If
the available evidence does not establish eligibility, report **Blocked on
required information**.

When direct access to a visual artifact is unavailable, do not claim to have
reviewed its geometry. Review the available written evidence and state which
visual checks remain open.

## Apply these rules in every phase

- First decide whether the UI needs an icon and whether an existing Octicon
  already communicates the intended action, object, or status.
- Search by metaphor and use-case synonyms, not only by the request's proposed
  name.
- Treat branded icons and logos as a Brand review path. Do not approve them as
  routine Octicons.
- Keep one canonical base name across every natural size. A matching name is
  not proof that two drawings represent the same glyph.
- Require descriptive alt text or an equivalent written explanation for
  screenshots and other visual media.
- Separate verified facts from recommendations and open checks.
- Do not use post-publication monitoring as proof that Figma and package
  artwork match.

## Report the outcome

Lead with one disposition:

- **Existing icon recommended**
- **Design working session needed**
- **Ready for contribution**
- **Changes requested**
- **Ready for requestor review**
- **Ready for maintainer approval**
- **Ready to merge**
- **Not eligible for Octicons**
- **Blocked on required information**

Support the disposition with the use case, the evidence reviewed, specific
findings, and the next owner or process step. For a pull request review, report
actionable findings before checklist confirmation.

Use **Ready for maintainer approval** only after the original requestor has
approved the icon and automated checks are green. Use **Ready to merge** only
after the original requestor and at least one designer on the Octicons
maintainer team have approved the pull request.

## Sources of truth

Use current repository files before remote copies:

- `CONTRIBUTING.md` for the request lifecycle and contribution process
- `docs/add-octicon-checklist.md` for Figma and package preparation
- `.github/pull_request_template.md` for contribution evidence
- `.github/workflows/` for automated checks
- [Octicons design guidelines](https://primer.style/octicons/design-guidelines/)
  for drawing rules
- [Icon request template](https://github.com/github/primer/blob/main/.github/ISSUE_TEMPLATE/04-icon-request.md)
  for intake requirements

If sources conflict, follow the current repository for process and package
requirements, and the design guidelines for drawing rules. Call out the
conflict instead of silently choosing a stale instruction.
