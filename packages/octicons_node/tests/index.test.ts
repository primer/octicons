import {expect, test} from 'vitest'
import octicons from '../index.cjs'

test('Octicons are loaded', () => {
  expect(octicons, "Didn't find any octicons.").toBeTruthy()
  expect(Object.keys(octicons).length, "Didn't find any octicons.").not.toBe(0)
})

test('Octicons have svg', () => {
  expect(octicons, "Didn't find any octicons.").toBeTruthy()
  for (const point of Object.keys(octicons)) {
    expect(octicons[point].toSVG(), `The octicon "${point}" doesn't have svg`).toBeTruthy()
  }
})

test('Octicons have default html attributes', () => {
  expect(octicons, "Didn't find any octicons.").toBeTruthy()
  for (const point of Object.keys(octicons)) {
    const svg = octicons[point].toSVG()
    expect(svg, `The octicon "${point}" doesn't have the version attribute`).toMatch(/version="1\.1"/)
    expect(svg, `The octicon "${point}" doesn't have the aria-hidden attribute`).toMatch(/aria-hidden="true"/)
    expect(svg, `The octicon "${point}" doesn't have the width attribute`).toMatch(/width=/)
    expect(svg, `The octicon "${point}" doesn't have the height attribute`).toMatch(/height=/)
    expect(svg, `The octicon "${point}" doesn't have the viewBox attribute`).toMatch(/viewBox=/)
    expect(svg, `The octicon "${point}" doesn't have the class attribute`).toMatch(
      new RegExp(`class="octicon octicon-${octicons[point].symbol}"`)
    )
  }
})

test('Passing in classnames will be included in output', () => {
  expect(octicons, "Didn't find any octicons.").toBeTruthy()
  for (const point of Object.keys(octicons)) {
    const svg = octicons[point].toSVG({class: 'new-class another-class'})
    expect(svg, `The octicon "${point}" doesn't have the class attribute`).toMatch(
      new RegExp(`class="octicon octicon-${octicons[point].symbol} new-class another-class"`)
    )
  }
})

test('Passing in aria-label will update the a11y options', () => {
  expect(octicons, "Didn't find any octicons.").toBeTruthy()
  for (const point of Object.keys(octicons)) {
    const svg = octicons[point].toSVG({'aria-label': 'This is an icon'})
    expect(svg, `The octicon "${point}" doesn't have the aria-label attribute`).toMatch(/aria-label="This is an icon"/)
  }
})

test('Passing in width will size properly', () => {
  const svg = octicons['x'].toSVG({height: 60})
  expect(svg, 'The octicon "x" doesn\'t have the width attribute scaled properly').toMatch(/width="60"/)
})

test('Passing in height will size properly', () => {
  const svg = octicons['x'].toSVG({width: 45})
  expect(svg, 'The octicon "x" doesn\'t have the height attribute scaled properly').toMatch(/height="45"/)
})

test('Passing in height will size properly', () => {
  const svg = octicons['x'].toSVG({width: 45})
  expect(svg, 'The octicon "x" doesn\'t have the height attribute scaled properly').toMatch(/height="45"/)
})

test('Chooses the correct svg given a height', () => {
  const svg = octicons['x'].toSVG({height: 32})
  expect(svg).toMatch(/width="32"/)
  expect(svg).toMatch(/height="32"/)
  expect(svg).toMatch(/viewBox="0 0 24 24"/)
})

test('Chooses the correct svg given a width', () => {
  const svg = octicons['x'].toSVG({width: 24})
  expect(svg).toMatch(/width="24"/)
  expect(svg).toMatch(/height="24"/)
  expect(svg).toMatch(/viewBox="0 0 24 24"/)
})

test('Chooses the correct svg given a width and height', () => {
  const svg = octicons['x'].toSVG({width: 16, height: 24})
  expect(svg).toMatch(/width="16"/)
  expect(svg).toMatch(/height="24"/)
  expect(svg).toMatch(/viewBox="0 0 24 24"/)
})
