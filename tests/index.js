/* eslint-disable i18n-text/no-en */

import fs from 'fs-extra'
import globby from 'globby'
import {expect, test} from 'vitest'

const year = new Date().getFullYear()
const yearRegex = new RegExp(`Copyright \\(c\\) ${year} GitHub Inc\\.`)
const octiconsLib = fs.readdirSync(new URL('../packages/build/svg', import.meta.url))
const octiconsData = fs.readJsonSync(new URL('../packages/build/data.json', import.meta.url))

test(`LICENSE files have the current year ${year}`, async () => {
  const paths = await globby(['**/LICENSE', '!**/node_modules/**/LICENSE', '!**/vendor/**/LICENSE'])

  expect.assertions(paths.length)

  for (const filepath of paths) {
    const license = fs.readFileSync(filepath, 'utf8')
    expect(license, `The license "${filepath}" does not include the current year ${year}`).toMatch(yearRegex)
  }
})

test('SVG icons exist', () => {
  expect(octiconsLib.length, `We didn't find any svg files`).not.toBe(0)
})

test('Data file exist', () => {
  expect(Object.keys(octiconsData).length, `We didn't find any data files`).not.toBe(0)
})

const names = {}
for (const octicon of Object.values(octiconsData)) {
  test(`No duplicate ${octicon.name} icon`, () => {
    if (names[octicon.name]) {
      throw new Error(
        `Found duplicate '${octicon.name}' icons in the figma file. Please rename one of them. https://www.figma.com/file/${octicon.file}?node-id=${octicon.id}`,
      )
    }

    names[octicon.name] = octicon
  })
}
