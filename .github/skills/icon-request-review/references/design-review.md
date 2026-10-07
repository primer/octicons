# Design review

Use this reference when reviewing a metaphor, drawing, mock, or Figma
component. Review both the concept and each natural-size drawing.

## Confirm the concept

- Verify the icon's meaning in its actual GitHub UI context.
- Check whether the interface needs an icon and whether an existing Octicon
  already fits.
- Reduce concepts that attempt to communicate multiple independent ideas.
- Compare related icon families so the metaphor and modifiers follow existing
  conventions.
- Route branded icons and logos through Brand before normal Octicons approval.

## Review each natural size

- Require 16px and 24px drawings by default.
- Add a 12px drawing only for a specific use case where 16px cannot work.
- Use a consistent 1.5px stroke width at 16px and 24px.
- Use round caps and joins.
- Compare optical volume with the guideline's circle, square, and rectangle
  reference shapes.
- Use a 1px gap between overlapping objects.
- Use a 1.5px gap around modifiers such as lines and arrows.
- Prefer a 2D perspective unless depth materially improves recognition.
- Align outer shape edges to pixel boundaries when possible.
- Prefer line arrowheads unless the available space cannot support them.

Inspect the drawings at their natural rendered sizes. A clean zoomed-in vector
can still lose meaning, merge gaps, or appear visually unbalanced at 16px.

## Check cross-size consistency

The 16px and 24px drawings should represent the same metaphor and visual
family, but each drawing must work at its own grid size. Confirm:

- The primary object, modifiers, direction, and state stay consistent.
- Simplification at 16px does not change the meaning.
- Gaps remain visible and strokes do not merge.
- The optical weight matches related Octicons at both sizes.
- The canonical base name remains identical across sizes.

Do not claim path parity or drawing equivalence from component names alone.

## Check Figma preparation

Read and apply the Figma section of `docs/add-octicon-checklist.md`. It is the
source of truth for vector preparation, frame naming, component identity,
category placement, constraints, color, and keywords. Record each failed or
unverified checkbox in the review instead of reproducing the checklist from
memory.

## Record the review

Separate findings into:

- **Concept:** necessity, metaphor, scope, and existing-icon fit
- **Drawing:** geometry, optical volume, gaps, strokes, pixel alignment, and
  cross-size consistency
- **Figma:** naming, component identity, category, constraints, color, and
  keywords
- **Open evidence:** checks that require unavailable files, components, or
  rendered previews

Give findings that identify the affected size or component and the required
change. Avoid subjective approval without a reason tied to the guidelines or
an established Octicons pattern.
