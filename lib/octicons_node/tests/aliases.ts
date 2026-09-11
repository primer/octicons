type Octicon = {
  name: string
  symbol: string
  aliasOf?: string
  deprecated?: boolean
  heights: Record<string, {path: string; options: Record<string, string | number>}>
  toSVG(options?: Record<string, string | number>): string
}

const octicons = require('../') as Record<string, Octicon>
const aliases = [
  {name: 'bookmark-filled', canonical: 'bookmark-fill', heights: ['16'], deprecated: true},
  {name: 'repo-deleted', canonical: 'repo-delete', heights: ['16'], deprecated: true},
  {name: 'play', canonical: 'triangle-circle', heights: ['16', '24'], deprecated: undefined},
]

test.each(aliases)('$name keeps its identity and natural sizes', ({name, canonical, heights, deprecated}) => {
  const icon = octicons[name]
  expect(icon.name).toBe(name)
  expect(icon.symbol).toBe(name)
  expect(icon.aliasOf).toBe(canonical)
  expect(icon.deprecated).toBe(deprecated)
  expect(Object.keys(icon.heights)).toEqual(heights)

  for (const height of [16, 20, 24, 32, 64]) {
    const naturalHeight = height >= 24 && heights.includes('24') ? '24' : '16'
    const svg = icon.toSVG({height, class: 'custom', 'aria-label': 'Example'})
    expect(svg).toContain(`class="octicon octicon-${name} custom"`)
    expect(svg).toContain(`viewBox="0 0 ${naturalHeight} ${naturalHeight}"`)
    expect(svg).toContain(octicons[canonical].heights[naturalHeight].path)
    expect(svg).toContain('aria-label="Example"')
    expect(icon.heights[naturalHeight].options.class).toBe(`octicon octicon-${name}`)
    expect(octicons[canonical].heights[naturalHeight].options.class).toBe(`octicon octicon-${canonical}`)
  }
})

test.each(['bookmark-fill', 'repo-delete'])('%s preserves its unsized helper output', name => {
  for (const svg of [
    octicons[name].toSVG(),
    octicons[name].toSVG({class: 'custom'}),
    octicons[name].toSVG({'aria-label': 'Example'}),
  ]) {
    expect(svg).toContain('viewBox="0 0 24 24"')
    expect(svg).toContain('height="24"')
  }
  expect(octicons[name].toSVG({height: 16})).toContain('viewBox="0 0 16 16"')
  expect(octicons[name].toSVG({width: 16})).toContain('viewBox="0 0 16 16"')
})

test.each(['triangle', 'triangle-circle', 'triangle-fill'])('%s provides two natural sizes', name => {
  expect(Object.keys(octicons[name].heights)).toEqual(['16', '24'])
  expect(octicons[name].toSVG()).toContain('height="16"')
  expect(octicons[name].toSVG({height: 24})).toContain('viewBox="0 0 24 24"')
})

test('keeps unlisted pull requests single-size and play circled', () => {
  expect(Object.keys(octicons['git-pull-request-unlisted'].heights)).toEqual(['16'])
  expect(octicons.play.toSVG()).toContain('height="16"')
  for (const height of ['16', '24']) {
    expect(octicons.play.heights[height].path).toBe(octicons['triangle-circle'].heights[height].path)
    expect(octicons.play.heights[height].path).not.toBe(octicons.triangle.heights[height].path)
  }
})
