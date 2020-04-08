import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import React from 'react'
import Octicon, {Alert} from '../index'

describe('Octicon component', () => {
  it('throws an error without a single child or icon prop', () => {
    // console.error() is ugly af in jest; mock it with a noop
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
    expect(() => render(<Octicon />)).toThrow()
    expect(() => render(<Octicon icon={null} />)).toThrow()
  })

  it('passes props to icon prop', () => {
    const {container} = render(
      <Octicon ariaLabel="icon" className="foo" size={20} verticalAlign="middle" icon={Alert} />
    )
    expect(container.querySelector('svg')).toHaveAttribute('class', 'foo')
    expect(container.querySelector('svg')).toHaveAttribute('width', '20')
    expect(container.querySelector('svg')).toHaveAttribute('height', '20')
    expect(container.querySelector('svg')).toHaveStyle({verticalAlign: 'middle'})
  })

  it('passes props to icon as child', () => {
    const {container} = render(
      <Octicon ariaLabel="icon" className="foo" size={20} verticalAlign="middle">
        <Alert />
      </Octicon>
    )
    expect(container.querySelector('svg')).toHaveAttribute('aria-label', 'icon')
    expect(container.querySelector('svg')).toHaveAttribute('class', 'foo')
    expect(container.querySelector('svg')).toHaveAttribute('width', '20')
    expect(container.querySelector('svg')).toHaveAttribute('height', '20')
    expect(container.querySelector('svg')).toHaveStyle({verticalAlign: 'middle'})
  })
})

describe('An icon component', () => {
  it('matches snapshot', () => {
    const {container} = render(<Alert />)
    expect(container.querySelector('svg')).toMatchSnapshot()
  })

  it('sets aria-hidden="false" if ariaLabel prop is present', () => {
    const {container} = render(<Alert ariaLabel="icon" />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'false')
    expect(container.querySelector('svg')).toHaveAttribute('aria-label', 'icon')
  })

  it('respects the className prop', () => {
    const {container} = render(<Alert className="foo" />)
    expect(container.querySelector('svg')).toHaveAttribute('class', 'foo')
  })

  it('respects the verticalAlign prop', () => {
    const {container} = render(<Alert verticalAlign="middle" />)
    expect(container.querySelector('svg')).toHaveStyle({verticalAlign: 'middle'})
  })

  describe('size props', () => {
    it('respects size="small"', () => {
      const {container} = render(<Alert size="small" />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '16')
      expect(container.querySelector('svg')).toHaveAttribute('height', '16')
    })

    it('respects size="medium"', () => {
      const {container} = render(<Alert size="medium" />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '32')
      expect(container.querySelector('svg')).toHaveAttribute('height', '32')
    })

    it('respects size="large"', () => {
      const {container} = render(<Alert size="large" />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '64')
      expect(container.querySelector('svg')).toHaveAttribute('height', '64')
    })

    it('respects size={number}', () => {
      const {container} = render(<Alert size={128} />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '128')
      expect(container.querySelector('svg')).toHaveAttribute('height', '128')
    })

    it('chooses the correct SVG given a size <24', () => {
      const {container} = render(<Alert size={20} />)
      expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 16 16')
      expect(container.querySelector('svg')).toHaveAttribute('width', '20')
      expect(container.querySelector('svg')).toHaveAttribute('height', '20')
    })

    it('chooses the correct SVG given a size >=24', () => {
      const {container} = render(<Alert size={24} />)
      expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24')
      expect(container.querySelector('svg')).toHaveAttribute('width', '24')
      expect(container.querySelector('svg')).toHaveAttribute('height', '24')
    })
  })
})
