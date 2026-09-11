import {describe, expect, test} from 'vitest'
import {render} from '@testing-library/react'
import {createRef} from 'react'
import {
  BookmarkFilledIconReference,
  BookmarkFilledSymbol,
  BookmarkFillSymbol,
  GitPullRequestUnlistedSymbol,
  PlayIconReference,
  PlaySymbol,
  RepoDeletedIconReference,
  RepoDeletedSymbol,
  RepoDeleteSymbol,
  TriangleCircleSymbol,
  TriangleFillSymbol,
  TriangleSymbol,
} from '../generated'
import {OcticonSymbols} from '../OcticonSymbols'

describe('compatibility symbols', () => {
  test.each([
    {
      name: 'bookmark-filled',
      Reference: BookmarkFilledIconReference,
      Symbol: BookmarkFilledSymbol,
      Canonical: BookmarkFillSymbol,
      has24: false,
    },
    {
      name: 'repo-deleted',
      Reference: RepoDeletedIconReference,
      Symbol: RepoDeletedSymbol,
      Canonical: RepoDeleteSymbol,
      has24: false,
    },
    {name: 'play', Reference: PlayIconReference, Symbol: PlaySymbol, Canonical: TriangleCircleSymbol, has24: true},
  ])('$name preserves symbol IDs and reference behavior', ({name, Reference, Symbol, Canonical, has24}) => {
    for (const size of [undefined, 16, 20, 24, 32, 64]) {
      const height = has24 && size !== undefined && size >= 24 ? 24 : 16
      const ref = createRef<SVGSVGElement>()
      const {container, unmount} = render(
        <OcticonSymbols symbols={[Symbol, Canonical]}>
          <Reference ref={ref} size={size} aria-label="Example" />
        </OcticonSymbols>,
      )
      const symbol = container.querySelector(`symbol[id="symbol-octicon-${name}-${height}"]`)
      const canonical = container.querySelector(`symbol[id="${Canonical.id}-${height}"]`)
      expect(Symbol.id).toBe(`symbol-octicon-${name}`)
      expect(ref.current?.getAttribute('viewBox')).toBe(`0 0 ${height} ${height}`)
      expect(ref.current?.querySelector('use')?.getAttribute('href')).toBe(`#symbol-octicon-${name}-${height}`)
      if (!symbol || !canonical) throw new Error('Expected both alias and canonical symbol definitions')
      expect(symbol.childNodes).toHaveLength(canonical.childNodes.length)
      for (const [index, child] of Array.from(symbol.childNodes).entries()) {
        expect(child.isEqualNode(canonical.childNodes[index])).toBe(true)
      }
      expect(container.querySelectorAll(`[id="symbol-octicon-${name}-${height}"]`)).toHaveLength(1)
      unmount()
    }
  })

  test('registers each new icon at only its natural sizes', () => {
    const {container} = render(
      <OcticonSymbols
        symbols={[TriangleSymbol, TriangleCircleSymbol, TriangleFillSymbol, GitPullRequestUnlistedSymbol]}
      />,
    )
    for (const name of ['triangle', 'triangle-circle', 'triangle-fill']) {
      expect(container.querySelector(`symbol[id="symbol-octicon-${name}-16"]`)).not.toBeNull()
      expect(container.querySelector(`symbol[id="symbol-octicon-${name}-24"]`)).not.toBeNull()
    }
    expect(container.querySelector('symbol[id="symbol-octicon-git-pull-request-unlisted-16"]')).not.toBeNull()
    expect(container.querySelector('symbol[id="symbol-octicon-git-pull-request-unlisted-24"]')).toBeNull()
  })
})
