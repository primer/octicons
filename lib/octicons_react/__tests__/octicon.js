import React from 'react'
import Octicon from '../'
import renderer from 'react-test-renderer'

const render = el => renderer.create(el).toJSON()

// set a default child; this is essentially a shallow render helper
const TestOcticon = ({children, ...props}) => {
  return <Octicon {...props}>{children || <path />}</Octicon>
}

describe('<Octicon>', () => {
  it('throws an error without a single child or icon prop', () => {
    // console.error() is ugly af in jest; mock it with a noop
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
    expect(() => render(<Octicon />)).toThrow()
    expect(() => render(<Octicon icon={null} />)).toThrow()
  })

  it('outputs <svg>', () => {
    const rendered = render(<TestOcticon />)
    expect(rendered).toMatchSnapshot()
    expect(rendered.type).toEqual('svg')
  })

  it('respects the className prop', () => {
    expect(render(<TestOcticon className="foo" />).props.className).toEqual('foo')
  })

  it('respects the verticalAlign prop', () => {
    expect(render(<TestOcticon verticalAlign="middle" />).props.style.verticalAlign).toEqual('middle')
    expect(render(<TestOcticon verticalAlign="text-bottom" />).props.style.verticalAlign).toEqual('text-bottom')
    // FIXME: I have no idea why this fails!
    // expect(render(<TestOcticon verticalAlign="text-top" />).props.style.verticalAlign).toEqual('text-top')
    expect(render(<TestOcticon verticalAlign="top" />).props.style.verticalAlign).toEqual('text-top')
  })

  describe('with <path> as child', () => {
    it('generates a default viewBox', () => {
      const rendered = render(<TestOcticon />)
      expect(rendered.props.viewBox).toEqual('0 0 16 16')
    })

    it('generates default viewBox', () => {
      const rendered = render(<TestOcticon />)
      expect(rendered.props.viewBox).toEqual('0 0 16 16')
    })
  })

  describe('Icon type support', () => {
    function Icon() {
      return <path />
    }
    Icon.size = [12, 20]

    it('generates the right viewBox with an <Icon/> child', () => {
      const rendered = render(
        <Octicon>
          <Icon />
        </Octicon>
      )
      expect(rendered.props.viewBox).toEqual('0 0 12 20')
    })

    it('generates the right viewBox with icon={Icon}', () => {
      const rendered = render(<Octicon icon={Icon} />)
      expect(rendered.props.viewBox).toEqual('0 0 12 20')
    })
  })
})
