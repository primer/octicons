import React from 'react'
import Octicon from '../'
import renderer from 'react-test-renderer'

const render = el => renderer.create(el).toJSON()

describe('<Octicon>', () => {
  it('throws an error without a single child or icon prop', () => {
    expect(() => render(<Octicon />)).toThrow()
    expect(() => render(<Octicon icon={null} />)).toThrow()
  })

  it('outputs <svg>', () => {
    const rendered = render(
      <Octicon>
        <path />
      </Octicon>
    )
    expect(rendered.type).toEqual('svg')
  })

  describe('with <path> as child', () => {
    it('generates a default viewBox', () => {
      const rendered = render(
        <Octicon>
          <path />
        </Octicon>
      )
      expect(rendered.props.viewBox).toEqual('0 0 16 16')
    })

    it('generates default viewBox', () => {
      const rendered = render(
        <Octicon>
          <path />
        </Octicon>
      )
      expect(rendered.props.viewBox).toEqual('0 0 16 16')
    })
  })

  function Icon() {
    return <path />
  }
  Icon.size = [12, 20]

  describe('with an <Icon/> child', () => {
    it('generates the right viewBox', () => {
      const rendered = render(
        <Octicon>
          <Icon />
        </Octicon>
      )
      expect(rendered.props.viewBox).toEqual('0 0 12 20')
    })
  })

  describe('with an icon={Icon} prop', () => {
    it('generates the right viewBox', () => {
      const rendered = render(<Octicon icon={Icon} />)
      expect(rendered.props.viewBox).toEqual('0 0 12 20')
    })
  })
})
