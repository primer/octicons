import {Alert, X, getIconByName, iconsByName} from '../'

describe('import {getIconByName}', () => {
  it('gets named icons', () => {
    const Icon = getIconByName('x')
    expect(Icon).toEqual(X)
  })
})

describe('import {iconsByName}', () => {
  it('gets all the icons', () => {
    expect(iconsByName.alert).toEqual(Alert)
  })
})
