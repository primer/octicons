import path from 'node:path'
import execa from 'execa'
import metadata from '../icon-metadata.json' with {type: 'json'}
import {selectOptimizableIcons} from '../script/optimization-inputs.ts'

const selector = path.resolve(import.meta.dirname, '../script/optimization-inputs.ts')
const preserved = [
  'icons/bookmark-fill-16.svg',
  'icons/repo-delete-16.svg',
  'icons/triangle-circle-16.svg',
  'icons/triangle-circle-24.svg',
]
const eligible = [
  'icons/bookmark-fill-24.svg',
  'icons/repo-delete-24.svg',
  'icons/triangle-16.svg',
  'icons/triangle-fill-24.svg',
  'icons/git-pull-request-unlisted-16.svg',
  'icons/comment-fill-16.svg',
  'icons/comment-fill-24.svg',
]

test('preserves aliased source heights while optimizing other icons', () => {
  expect(selectOptimizableIcons([...preserved, ...eligible], metadata)).toEqual(eligible)
})

test('protects fingerprints even without aliases and handles nested source paths', () => {
  expect(
    selectOptimizableIcons(['icons/group/protected-16.svg', 'icons/group/protected-24.svg'], {
      protected: {protectedGeometry: {'16': 'baseline'}},
    }),
  ).toEqual(['icons/group/protected-24.svg'])
})

test('uses only the natural heights retained by aliases', () => {
  expect(
    selectOptimizableIcons(['icons/canonical-16.svg', 'icons/canonical-24.svg'], {
      canonical: {aliases: {legacy: {heights: [16]}}},
    }),
  ).toEqual(['icons/canonical-24.svg'])
})

test('the workflow CLI emits eligible paths and explains preserved paths', async () => {
  const {stdout, stderr} = await execa(process.execPath, [selector], {
    env: {CHANGED_ICONS: [...preserved, ...eligible].join('\n')},
  })
  expect(stdout.split('\n')).toEqual(eligible)
  for (const file of preserved) expect(stderr).toContain(file)
})

test.each(['', preserved.join('\n')])('handles an empty optimization set without scheduling writes', async input => {
  const {stdout} = await execa(process.execPath, [selector], {env: {CHANGED_ICONS: input}})
  expect(stdout).toBe('')
})

test.each(['../icons/triangle-16.svg', 'icons/../triangle-16.svg', 'icons/triangle-16.txt'])(
  'rejects invalid source input %s',
  async input => {
    await expect(execa(process.execPath, [selector], {env: {CHANGED_ICONS: input}})).rejects.toMatchObject({
      exitCode: 1,
      stderr: expect.stringContaining('Invalid source SVG path'),
    })
  },
)
