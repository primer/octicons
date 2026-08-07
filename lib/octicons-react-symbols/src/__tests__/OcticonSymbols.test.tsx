import {describe, expect, test} from 'vitest'
import {render, screen} from '@testing-library/react'
import {createRef} from 'react'
import {createIconReference} from '../IconReference'
import {OcticonSymbols} from '../OcticonSymbols'

const [TestSymbol, TestIconReference] = createIconReference({
  id: 'symbol-octicon-test',
  name: 'TestIconReference',
  sizes: {
    '16': {
      definition: (
        <symbol data-testid="test-symbol" id="symbol-octicon-test-16" viewBox="0 0 16 16">
          <path />
        </symbol>
      ),
      id: 'symbol-octicon-test-16',
      width: 16,
    },
    '24': {
      definition: <symbol data-testid="test-symbol-24" id="symbol-octicon-test-24" viewBox="0 0 30 24" />,
      id: 'symbol-octicon-test-24',
      width: 30,
    },
  },
})

describe('createIconReference', () => {
  test('creates a symbol and matching icon reference component', () => {
    const ref = createRef<SVGSVGElement>()
    const {container, rerender} = render(<TestIconReference ref={ref} data-testid="test-icon" />)

    expect(TestIconReference.displayName).toBe('TestIconReference')
    expect(ref.current).toBe(screen.getByTestId('test-icon'))
    expect(container.querySelector('use')?.getAttribute('href')).toBe('#symbol-octicon-test-16')

    rerender(<TestIconReference ref={ref} data-testid="test-icon" size={24} />)

    expect(container.querySelector('use')?.getAttribute('href')).toBe('#symbol-octicon-test-24')
  })
})

describe('OcticonSymbols', () => {
  test('renders symbols in the hidden sprite container', () => {
    render(
      <OcticonSymbols symbols={[TestSymbol]}>
        <div data-testid="child" />
      </OcticonSymbols>,
    )

    expect(screen.getByTestId('test-symbol').getAttribute('id')).toBe('symbol-octicon-test-16')
    expect(screen.getByTestId('test-symbol-24').getAttribute('id')).toBe('symbol-octicon-test-24')
    expect(screen.getByTestId('child')).toBeDefined()
  })

  test('does not render duplicate symbols', () => {
    const [NestedDuplicateSymbol] = createIconReference({
      id: TestSymbol.id,
      sizes: {
        '16': {
          definition: <symbol data-testid="nested-duplicate-symbol" id="symbol-octicon-test-16" />,
          id: 'symbol-octicon-test-16',
          width: 16,
        },
      },
    })

    const {container} = render(
      <OcticonSymbols symbols={[TestSymbol, TestSymbol]}>
        <OcticonSymbols symbols={[NestedDuplicateSymbol]} />
      </OcticonSymbols>,
    )

    expect(screen.getAllByTestId('test-symbol')).toHaveLength(1)
    expect(screen.queryByTestId('nested-duplicate-symbol')).toBeNull()
    expect(container.querySelectorAll('svg')).toHaveLength(1)
  })

  test('renders symbols that are not registered by an ancestor', () => {
    const [NestedSymbol] = createIconReference({
      id: 'symbol-octicon-nested',
      sizes: {
        '16': {
          definition: <symbol data-testid="nested-symbol" id="symbol-octicon-nested-16" />,
          id: 'symbol-octicon-nested-16',
          width: 16,
        },
      },
    })

    render(
      <OcticonSymbols symbols={[TestSymbol]}>
        <OcticonSymbols symbols={[TestSymbol, NestedSymbol]} />
      </OcticonSymbols>,
    )

    expect(screen.getAllByTestId('test-symbol')).toHaveLength(1)
    expect(screen.getByTestId('nested-symbol')).toBeDefined()
  })
})
