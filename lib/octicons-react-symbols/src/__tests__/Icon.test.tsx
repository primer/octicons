import {describe, expect, test} from 'vitest'
import {render, screen} from '@testing-library/react'
import {createRef} from 'react'
import {Icon} from '../Icon'

const sizes = {
  '16': {
    id: 'symbol-octicon-test-16',
    width: 16,
  },
  '24': {
    id: 'symbol-octicon-test-24',
    width: 30,
  },
}

describe('Icon', () => {
  test('renders a decorative icon by default', () => {
    const {container} = render(<Icon data-testid="icon" sizes={sizes} />)

    const icon = screen.getByTestId('icon')
    expect(icon.getAttribute('data-component')).toBe('Octicon')
    expect(icon.getAttribute('aria-hidden')).toBe('true')
    expect(icon.getAttribute('focusable')).toBe('false')
    expect(icon.hasAttribute('role')).toBe(false)
    expect(icon.getAttribute('viewBox')).toBe('0 0 16 16')
    expect(icon.getAttribute('width')).toBe('16')
    expect(icon.getAttribute('height')).toBe('16')
    expect(icon.getAttribute('fill')).toBe('currentColor')
    expect(icon.getAttribute('display')).toBe('inline-block')
    expect(icon.getAttribute('overflow')).toBe('visible')
    expect(icon.getAttribute('style')).toContain('vertical-align: text-bottom;')
    expect(container.querySelector('use')?.getAttribute('href')).toBe('#symbol-octicon-test-16')
  })

  test('renders an accessible icon when labelled', () => {
    render(<Icon aria-label="Issue opened" data-testid="icon" sizes={sizes} title="Issue opened" />)

    const icon = screen.getByRole('img', {name: 'Issue opened'})
    expect(icon.hasAttribute('aria-hidden')).toBe(false)
    expect(icon.getAttribute('focusable')).toBe('false')
    expect(icon.querySelector('title')?.textContent).toBe('Issue opened')
  })

  test('supports aria-labelledby', () => {
    render(
      <>
        <span id="icon-label">Pull request</span>
        <Icon aria-labelledby="icon-label" data-testid="icon" sizes={sizes} />
      </>,
    )

    expect(screen.getByRole('img', {name: 'Pull request'}).getAttribute('aria-labelledby')).toBe('icon-label')
  })

  test('forwards attributes and refs to the svg element', () => {
    const ref = createRef<SVGSVGElement>()

    render(<Icon ref={ref} className="octicon" data-testid="icon" fill="currentColor" id="test-icon" sizes={sizes} />)

    const icon = screen.getByTestId('icon')
    expect(ref.current).toBe(icon)
    expect(icon.getAttribute('class')).toBe('octicon')
    expect(icon.getAttribute('fill')).toBe('currentColor')
    expect(icon.getAttribute('id')).toBe('test-icon')
  })

  test('sets focusable when tabIndex allows keyboard focus', () => {
    render(<Icon data-testid="icon" sizes={sizes} tabIndex={0} />)

    const icon = screen.getByTestId('icon')
    expect(icon.getAttribute('focusable')).toBe('true')
    expect(icon.getAttribute('tabindex')).toBe('0')
  })

  test('keeps default vertical-align while merging style', () => {
    render(<Icon data-testid="icon" size={16} sizes={sizes} style={{color: 'red'}} />)

    const icon = screen.getByTestId('icon')
    expect(icon.getAttribute('style')).toContain('vertical-align: text-bottom;')
    expect(icon.getAttribute('style')).toContain('color: red;')
  })

  test('uses the closest natural height and scales width', () => {
    const {container, rerender} = render(<Icon data-testid="icon" size={20} sizes={sizes} />)

    const icon = screen.getByTestId('icon')
    expect(icon.getAttribute('viewBox')).toBe('0 0 16 16')
    expect(icon.getAttribute('width')).toBe('20')
    expect(icon.getAttribute('height')).toBe('20')
    expect(container.querySelector('use')?.getAttribute('href')).toBe('#symbol-octicon-test-16')

    rerender(<Icon data-testid="icon" size={24} sizes={sizes} />)
    expect(icon.getAttribute('viewBox')).toBe('0 0 30 24')
    expect(icon.getAttribute('width')).toBe('30')
    expect(icon.getAttribute('height')).toBe('24')
    expect(container.querySelector('use')?.getAttribute('href')).toBe('#symbol-octicon-test-24')

    rerender(<Icon data-testid="icon" size="medium" sizes={sizes} />)
    expect(icon.getAttribute('viewBox')).toBe('0 0 30 24')
    expect(icon.getAttribute('width')).toBe('40')
    expect(icon.getAttribute('height')).toBe('32')
    expect(container.querySelector('use')?.getAttribute('href')).toBe('#symbol-octicon-test-24')
  })
})
