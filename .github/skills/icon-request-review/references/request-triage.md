# Request triage

Use this reference for a new icon request, an existing-icon recommendation, or
the intake portion of an icon review request.

## Confirm eligibility

Octicons currently accepts requests only from GitHub staff and only for icons
used in the GitHub UI. Verify both conditions before evaluating the metaphor or
starting design work.

If either condition fails, report **Not eligible for Octicons** and do not route
the request to design or contribution. If the request does not establish both
conditions, ask for the missing evidence.

## Read the request

Record:

- Whether the request asks for an existing-icon recommendation or a working
  session to polish a new design
- The concept or metaphor that the icon represents
- The exact GitHub UI or Figma context where it appears
- The action, object, or status that a person must understand
- The timeline and any launch dependency
- Whether the artwork is a brand mark or logo
- Available mocks, drawings, screenshots, and their text alternatives

A feature name alone does not describe an icon use case. Require enough context
to understand the surrounding controls, labels, placement, and expected user
interpretation.

Use the selected request type to determine the process:

- An existing-icon recommendation can proceed asynchronously in the issue or
  the `#primer-octicons` channel.
- A request to polish an icon design requires a working session. Do not skip
  the session because the submitted design appears complete.
- If both request types or neither request type are selected, clarify the
  request before routing it.

## Decide whether an icon is necessary

Check these questions in order:

1. Does the interface need an icon, or can visible text communicate the meaning
   more clearly?
2. Does an existing Octicon already represent the same action, object, or
   status in this context?
3. Does the proposed metaphor communicate one idea, or does it combine several
   ideas that will not remain legible at small sizes?
4. Does the request rely on product knowledge that the drawing cannot
   communicate on its own?
5. Does the timeline allow design, stakeholder review, maintainer review, and a
   package release?

## Search existing Octicons

Search the published library and the current repository:

- Review `icons/` filenames for related families and modifiers.
- Search `keywords.json` with the request's nouns, verbs, states, and synonyms.
- Compare the actual drawings at the intended sizes. Similar names do not prove
  that the visual meaning matches.
- Check established family prefixes, such as `issue-*` and
  `git-pull-request-*`.
- Confirm that the candidate exists at every size needed by the product.

Recommend an existing icon when its established meaning fits the proposed
context. Include the canonical icon name, available natural sizes, why it fits,
and any risk of ambiguity. Do not start a new-icon contribution when an
existing icon meets the need.

## Route the request

### Existing icon recommendation

Provide:

- The recommended canonical name
- A link or repository path to the icon
- The intended meaning in the request's context
- Available sizes
- Any usage caveat

### Design working session

Use this route whenever the request asks for help polishing an icon design.
State which questions the working session must resolve, such as metaphor,
scope, family relationship, natural sizes, or brand involvement. Load
`design-review.md` for the visual criteria. Completing the review
asynchronously does not replace the required working session.

### Ready for contribution

Use this route only when the use case, metaphor, canonical name, natural sizes,
and stakeholder are clear, and any required working session has occurred. Load
`contribution-review.md` before creating or reviewing the pull request.

### Required information missing

Ask only for the evidence needed to make the current decision. Common blockers
include:

- No GitHub UI or Figma usage context
- No explanation of the action, object, or status
- No visual artifact for a requested drawing review
- No timeline for a launch-dependent request
- Unresolved brand or logo status

## Maintain the issue lifecycle

Follow `CONTRIBUTING.md` for project status and communication:

1. A maintainer replies during triage and moves accepted work to the team
   backlog.
2. The assigned designer communicates status and drives the work.
3. Design work moves to the design-in-progress state.
4. The contribution pull request links back to the request issue.
5. The requestor and at least one designer on the Octicons maintainer team
   approve the contribution.
6. The issue records approval, then moves to done after the Octicons release.

Do not describe an approved pull request as released. Package availability
starts with the subsequent Octicons release.
