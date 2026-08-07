import * as Octicons from '../dist/index.esm.mjs'

describe('@primer/octicons-react', () => {
  it('should not update exports without a semver change', () => {
    expect(Object.keys(Octicons).sort()).toMatchSnapshot()
  })
})
