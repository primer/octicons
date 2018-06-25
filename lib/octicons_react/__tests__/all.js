import React from 'react'
import getIconByName, {iconsByName} from '../icons/all'
import renderer from 'react-test-renderer'
import {Alert, Zap} from '../'

const render = el => renderer.create(el).toJSON()

describe("import {getIconByName} from '@github/octicons-react/icons/all'", () => {
  it('gets named icons', () => {
    const Icon = getIconByName('zap')
    expect(render(<Icon/>)).toEqual(render(<Zap/>))
  })

  it('gets all the icons', () => {
    expect(iconsByName.alert).toEqual(Alert)
  })
})
