import {Alert, Zap, getIconByName, iconsByName} from '../'

describe('import {getIconByName}', () => {
  it('gets named icons', () => {
    const Icon = getIconByName('zap')
    expect(Icon).toEqual(Zap)
  })
})

describe('import {iconsByName}', () => {
  it('gets all the icons', () => {
    expect(iconsByName.alert).toEqual(Alert)
  })
})
