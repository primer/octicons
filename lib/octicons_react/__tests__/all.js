import React from 'react'
import getIcon from '../icons/all'
import renderer from 'react-test-renderer'
import {Zap} from '../'

const render = el => renderer.create(el).toJSON()

describe("import getIcon from '@github/octicons-react/icons/all'", () => {
  it('gets named icons', () => {
    const Icon = getIcon('zap')
    expect(render(<Icon/>)).toEqual(render(<Zap/>))
  })
})
