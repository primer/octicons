/* eslint-disable i18n-text/no-en */

const fs = require('fs-extra')
const globby = require('globby')

const year = new Date().getFullYear()
const yearRegex = new RegExp(`Copyright \\(c\\) ${year} GitHub Inc\\.`)
const octiconsLib = fs.readdirSync('./lib/build/svg')
type OcticonData = {
  name: string
  file?: string
  id?: string
}

const octiconsData = require('../lib/build/data.json') as Record<string, OcticonData>

test(`LICENSE files have the current year ${year}`, async () => {
  const paths = await globby(['**/LICENSE', '!**/node_modules/**/LICENSE', '!**/vendor/**/LICENSE'])
  for (const path of paths) {
    const license = fs.readFileSync(path, 'utf8')
    expect(license, `The license "${path}" does not include the current year ${year}`).toMatch(yearRegex)
  }
})

test('SVG icons exist', () => {
  expect(octiconsLib.length, `We didn't find any svg files`).not.toBe(0)
})

test('Data file exist', () => {
  expect(octiconsData.length, `We didn't find any data files`).not.toBe(0)
})

const names: Record<string, OcticonData> = {}
for (const octicon of Object.values(octiconsData)) {
  test(`No duplicate ${octicon.name} icon`, () => {
    if (names[octicon.name]) {
      throw new Error(
        `Found duplicate '${octicon.name}' icons in the figma file. Please rename one of them. https://www.figma.com/file/${octicon.file}?node-id=${octicon.id}`,
      )
    } else {
      names[octicon.name] = octicon
    }
  })
}
