#!/usr/bin/env node
import fs from 'node:fs'
import {join, resolve} from 'node:path'

const srcDir = resolve(import.meta.dirname, '../src/__generated__')
const iconsSrcDir = join(srcDir, 'icons')
const indexSrc = join(srcDir, '../index.d.ts')

const destDir = resolve(import.meta.dirname, '../dist')
const iconsDestDir = join(destDir, 'icons')
const indexDest = join(destDir, 'index.d.ts')

async function main() {
  // Copy only the generated declaration files (`.d.ts`) into `dist/icons`, so
  // subpath imports resolve their own types. The `.js` sources are compiled to
  // `.mjs` by Rolldown and must not be copied here.
  await fs.promises.cp(iconsSrcDir, iconsDestDir, {
    recursive: true,
    filter: async (src: string) => (await fs.promises.stat(src)).isDirectory() || src.endsWith('.d.ts'),
  })

  let contents = await fs.promises.readFile(indexSrc, 'utf8')
  contents = contents.replace(/.\/__generated__\//g, './')

  await fs.promises.writeFile(indexDest, contents, 'utf8')
  await fs.promises.writeFile(join(destDir, 'index.d.cts'), contents, 'utf8')
  await fs.promises.writeFile(join(destDir, 'index.d.mts'), contents, 'utf8')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
