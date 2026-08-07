import fs from 'node:fs'
import globby from 'globby'
import octiconsData from '../lib/build/data.json' with {type: 'json'}

const year = new Date().getFullYear()
const yearRegex = new RegExp(`Copyright \\(c\\) ${year} GitHub Inc\\.`)
const octiconsLib = fs.readdirSync('./lib/build/svg')
type OcticonData = {
  name: string
  file?: string
  id?: string
}
const typedOcticonsData = octiconsData as Record<string, OcticonData>

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
  expect(Object.keys(typedOcticonsData).length, `We didn't find any data files`).not.toBe(0)
})

const names: Record<string, OcticonData> = {}
for (const octicon of Object.values(typedOcticonsData)) {
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
