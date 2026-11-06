import React from 'react'
import * as Octicons from '../dist/index.esm.mjs'

describe('isOcticon', () => {
  it.each(Object.entries(Octicons).filter(([name]) => name.endsWith('Icon')))('recognizes %s', (_name, Icon) => {
    expect(Octicons.isOcticon(Icon)).toBe(true)
  })

  it('does not identify custom components by their display name', () => {
    const CustomIcon = React.forwardRef(() => null)
    CustomIcon.displayName = 'SearchIcon'

    expect(Octicons.isOcticon(CustomIcon)).toBe(false)
  })

  it.each([undefined, null, 'svg', {}, () => null, React.createElement(Octicons.SearchIcon)])(
    'rejects values that are not Octicon components: %s',
    value => {
      expect(Octicons.isOcticon(value)).toBe(false)
    },
  )

  it('recognizes components from the CommonJS entrypoint', async () => {
    const {default: commonJS} = await import('../dist/index.umd.cjs')

    expect(Octicons.isOcticon(commonJS.SearchIcon)).toBe(true)
    expect(commonJS.isOcticon(Octicons.SearchIcon)).toBe(true)
  })
})
