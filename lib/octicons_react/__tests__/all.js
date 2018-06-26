import React from 'react'
import {Alert, Zap, getIconByName, iconsByName} from '../'
import renderer from 'react-test-renderer'

const render = el => renderer.create(el).toJSON()

describe("import {getIconByName}", () => {
  it('gets named icons', () => {
    const Icon = getIconByName('zap')
    expect(render(<Icon/>)).toEqual(render(<Zap/>))
  })
})

describe("import {iconsByName} from '...'", () => {
  it('gets all the icons', () => {
    expect(iconsByName.alert).toEqual(Alert)
  })
})
