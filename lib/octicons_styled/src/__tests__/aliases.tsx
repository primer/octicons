import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import React from 'react'
import {
  BookmarkFillIcon,
  BookmarkFilledIcon,
  PlayIcon,
  RepoDeleteIcon,
  RepoDeletedIcon,
  TriangleCircleIcon,
} from '../__generated__/index'

test.each([
  {name: 'bookmark-filled', Alias: BookmarkFilledIcon, Canonical: BookmarkFillIcon, has24: false},
  {name: 'repo-deleted', Alias: RepoDeletedIcon, Canonical: RepoDeleteIcon, has24: false},
  {name: 'play', Alias: PlayIcon, Canonical: TriangleCircleIcon, has24: true},
])('$name keeps legacy artwork and styling', ({name, Alias, Canonical, has24}) => {
  for (const size of [16, 20, 24, 32, 64]) {
    const naturalHeight = has24 && size >= 24 ? 24 : 16
    const {container, unmount} = render(
      <>
        <Alias size={size} className="custom" aria-label="Example" color="red" />
        <Canonical size={naturalHeight} />
      </>,
    )
    const [actual, expected] = container.querySelectorAll('svg')
    expect(actual).toHaveClass(`octicon-${name}`, 'custom')
    expect(actual).toHaveAttribute('viewBox', `0 0 ${naturalHeight} ${naturalHeight}`)
    expect(actual).toHaveAttribute('height', String(size))
    expect(actual).toHaveAttribute('role', 'img')
    expect(actual.childNodes).toHaveLength(expected.childNodes.length)
    for (const [index, child] of Array.from(actual.childNodes).entries()) {
      expect(child.isEqualNode(expected.childNodes[index])).toBe(true)
    }
    unmount()
  }
})
