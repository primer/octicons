import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import React, {createRef} from 'react'
import {
  BookmarkFillIcon,
  BookmarkFilledIcon,
  GitPullRequestUnlistedIcon,
  PlayIcon,
  RepoDeleteIcon,
  RepoDeletedIcon,
  TriangleCircleIcon,
  TriangleFillIcon,
  TriangleIcon,
} from '../index'

const aliases = [
  {name: 'bookmark-filled', Alias: BookmarkFilledIcon, Canonical: BookmarkFillIcon, has24: false},
  {name: 'repo-deleted', Alias: RepoDeletedIcon, Canonical: RepoDeleteIcon, has24: false},
  {name: 'play', Alias: PlayIcon, Canonical: TriangleCircleIcon, has24: true},
]

test.each(aliases)('$name preserves rendering, attributes, and refs', ({name, Alias, Canonical, has24}) => {
  for (const size of [undefined, 16, 20, 24, 32, 64]) {
    const naturalHeight = has24 && size !== undefined && size >= 24 ? 24 : 16
    const ref = createRef<SVGSVGElement>()
    const props = {size, ref, className: 'custom', 'aria-label': 'Example'}
    const {container, unmount} = render(
      <>
        <Alias {...props} />
        <Canonical size={naturalHeight} />
      </>,
    )
    const [actual, expected] = container.querySelectorAll('svg')
    expect(ref.current).toBe(actual)
    expect(actual).toHaveClass(`octicon-${name}`, 'custom')
    expect(actual).toHaveAttribute('viewBox', `0 0 ${naturalHeight} ${naturalHeight}`)
    expect(actual).toHaveAttribute('height', String(size ?? 16))
    expect(actual).toHaveAttribute('role', 'img')
    expect(actual).toHaveAttribute('aria-label', 'Example')
    expect(actual.childNodes).toHaveLength(expected.childNodes.length)
    for (const [index, child] of Array.from(actual.childNodes).entries()) {
      expect(child.isEqualNode(expected.childNodes[index])).toBe(true)
    }
    unmount()
  }
})

test.each([
  {name: 'triangle', Icon: TriangleIcon},
  {name: 'triangle-circle', Icon: TriangleCircleIcon},
  {name: 'triangle-fill', Icon: TriangleFillIcon},
  {name: 'bookmark-fill', Icon: BookmarkFillIcon},
  {name: 'repo-delete', Icon: RepoDeleteIcon},
])('$name exposes the correct natural drawing at each size', ({name, Icon}) => {
  for (const size of [16, 24]) {
    const {container, unmount} = render(<Icon size={size} />)
    expect(container.querySelector('svg')).toHaveClass(`octicon-${name}`)
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', `0 0 ${size} ${size}`)
    unmount()
  }
})

test('scales the single-size unlisted icon without inventing a second drawing', () => {
  const {container} = render(<GitPullRequestUnlistedIcon size={24} />)
  expect(container.querySelector('svg')).toHaveAttribute('height', '24')
  expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 16 16')
})
