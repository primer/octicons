import fs from 'node:fs'
import path from 'node:path'
import {optimize} from 'svgo'
import config from '../svgo.config.mts'

test('optimizing window-minimize preserves its inherited color', () => {
  const svg = fs.readFileSync(path.resolve(import.meta.dirname, '../icons/window-minimize-16.svg'), 'utf8')
  const optimized = optimize(svg, config).data

  expect(optimized).toContain('fill="currentColor"')
  expect(optimized).not.toContain('fill="black"')
})
