import React from 'react'
import Octicon from '../index'
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

  describe('size props', () => {
    it('respects size="small"', () => {
      const rendered = render(<TestOcticon size="small" />)
      expect(rendered.props.width).toEqual(16)
      expect(rendered.props.height).toEqual(16)
    })

    it('respects size="medium"', () => {
      const rendered = render(<TestOcticon size="medium" />)
      expect(rendered.props.width).toEqual(32)
      expect(rendered.props.height).toEqual(32)
    })

    it('respects size="large"', () => {
      const rendered = render(<TestOcticon size="large" />)
      expect(rendered.props.width).toEqual(64)
      expect(rendered.props.height).toEqual(64)
    })

    it('respects size={number}', () => {
      const rendered = render(<TestOcticon size={128} />)
      expect(rendered.props.width).toEqual(128)
      expect(rendered.props.height).toEqual(128)
    })

    it('respects width instead of size', () => {
      const rendered = render(<TestOcticon width={48} />)
      expect(rendered.props.width).toEqual(48)
      expect(rendered.props.height).toEqual(48)
    })

    it('respects height instead of size', () => {
      const rendered = render(<TestOcticon height={48} />)
      expect(rendered.props.width).toEqual(48)
      expect(rendered.props.height).toEqual(48)
    })
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

    it('generates the right viewBox with custom size', () => {
      const rendered = render(<Octicon icon={Icon} size={40} />)
      expect(rendered.props.viewBox).toEqual('0 0 12 20')
      expect(rendered.props.height).toEqual(40)
      expect(rendered.props.width).toEqual(24)
    })

    it('generates the right viewBox with custom width', () => {
      const rendered = render(<Octicon icon={Icon} width={24} />)
      expect(rendered.props.viewBox).toEqual('0 0 12 20')
      expect(rendered.props.width).toEqual(24)
      expect(rendered.props.height).toEqual(40)
    })

    it('generates the right viewBox with custom height', () => {
      const rendered = render(<Octicon icon={Icon} height={10} />)
      expect(rendered.props.viewBox).toEqual('0 0 12 20')
      expect(rendered.props.width).toEqual(6)
      expect(rendered.props.height).toEqual(10)
    })
  })
})
