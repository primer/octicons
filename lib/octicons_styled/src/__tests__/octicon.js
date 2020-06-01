import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import 'jest-styled-components'
import React from 'react'
import {ThemeProvider} from 'styled-components'
import {AlertIcon} from '../__generated__/index'

describe('An icon component', () => {
  it('sets aria-hidden="false" if ariaLabel prop is present', () => {
    const {container} = render(<AlertIcon aria-label="icon" />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'false')
    expect(container.querySelector('svg')).toHaveAttribute('aria-label', 'icon')
  })

  it('respects the className prop', () => {
    const {container} = render(<AlertIcon className="foo" />)
    expect(container.querySelector('svg')).toHaveClass('foo')
  })

  it('respects the verticalAlign prop', () => {
    const {container} = render(<AlertIcon verticalAlign="middle" />)
    expect(container.querySelector('svg')).toHaveStyle({verticalAlign: 'middle'})
  })

  describe('size props', () => {
    it('respects size="small"', () => {
      const {container} = render(<AlertIcon size="small" />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '16')
      expect(container.querySelector('svg')).toHaveAttribute('height', '16')
    })

    it('respects size="medium"', () => {
      const {container} = render(<AlertIcon size="medium" />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '32')
      expect(container.querySelector('svg')).toHaveAttribute('height', '32')
    })

    it('respects size="large"', () => {
      const {container} = render(<AlertIcon size="large" />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '64')
      expect(container.querySelector('svg')).toHaveAttribute('height', '64')
    })

    it('respects size={number}', () => {
      const {container} = render(<AlertIcon size={128} />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '128')
      expect(container.querySelector('svg')).toHaveAttribute('height', '128')
    })

    it('chooses the correct SVG given a size <24', () => {
      const {container} = render(<AlertIcon size={20} />)
      expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 16 16')
      expect(container.querySelector('svg')).toHaveAttribute('width', '20')
      expect(container.querySelector('svg')).toHaveAttribute('height', '20')
    })

    it('chooses the correct SVG given a size >=24', () => {
      const {container} = render(<AlertIcon size={24} />)
      expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24')
      expect(container.querySelector('svg')).toHaveAttribute('width', '24')
      expect(container.querySelector('svg')).toHaveAttribute('height', '24')
    })
  })

  describe('system props', () => {
    it('respects the color prop', () => {
      const theme = {colors: {red: ['#ffeef0', '#ffdce0']}}
      const {container} = render(
        <ThemeProvider theme={theme}>
          <AlertIcon color="red.1" />
        </ThemeProvider>
      )
      expect(container.querySelector('svg')).toHaveStyleRule('color', '#ffdce0')
    })

    it('respects space props', () => {
      const theme = {space: [0, 4, 8, 16, 24, 32, 40, 48]}
      const {container} = render(
        <ThemeProvider theme={theme}>
          <AlertIcon ml={2} mt={1} mr={3} mb={4} />
        </ThemeProvider>
      )
      expect(container.querySelector('svg')).toHaveStyleRule('margin-top', '4px')
      expect(container.querySelector('svg')).toHaveStyleRule('margin-left', '8px')
      expect(container.querySelector('svg')).toHaveStyleRule('margin-right', '16px')
      expect(container.querySelector('svg')).toHaveStyleRule('margin-bottom', '24px')
    })

    it('respects sx props', () => {
      const theme = {colors: {red: ['#ffeef0', '#ffdce0']}}
      const {container} = render(
        <ThemeProvider theme={theme}>
          <AlertIcon sx={{color: 'red.0'}} />
        </ThemeProvider>
      )
      expect(container.querySelector('svg')).toHaveStyleRule('color', '#ffeef0')
    })
  })
})
