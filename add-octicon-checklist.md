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
- [ ] Name the icon frame to the correct icon name
  - Note: Octicon names should be written lower case and use `-` to separate descriptors
  - Note: If the icon is related to another icon or is part of a set, check the naming convention of the other icons to be consistent. (e.g. the issue icons are all prefixed as `issue-(something)`, `issue-opened`/`issue-closed`)
  - Note: 24px icons will end with `-24` (e.g. `issue-opened-24`)
- [ ] Copy/paste into [Octicons library file](https://www.figma.com/file/1ljgTFkT5NKNRfq5hw07JQ/Octicons?node-id=0%3A1)
- [ ] Convert the icons into components
- [ ] Set constraints of vectors to Scale/Scale
  - Note: If adding multiple icons, use the ["All Constraints" plugin](https://www.figma.com/community/plugin/847224511609531534/All-Constraints) for bulk editing
- [ ] Add keywords to icon component
  - Note: All keywords begin with the search flag `icon: `
  - Note: Keywords should describe other metaphors that the icon can represent when searching
  - Example: The `bookmark` icon's keywords are "icon: favorite, save, bookmark"

## Octicons package
- [ ] Use the [Octicons Push plugin](https://www.figma.com/community/plugin/825432045044458754/Octicons-Push) to create a pull request from Figma
- [ ] Open created pull request in the browser and add details
  - Pull request should include
    - [ ] Small description with the names of the new icons
    - [ ] Screenshot
    - [ ] Link to icon request issue for tracking
- [ ] Request reviewers
  - [ ] Original requestor (from issue)
  - [ ] Member of octicons team (@ashygee, @colebemis, @edokoa, @juliusschaeper)
- [ ] Submit pull request
