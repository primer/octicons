#!/usr/bin/env node
import {join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import fse from 'fs-extra'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const srcDir = resolve(__dirname, '../src/__generated__')
const iconsSrcDir = join(srcDir, 'icons')
const indexSrc = join(srcDir, '../index.d.ts')

const destDir = resolve(__dirname, '../dist')
const iconsDestDir = join(destDir, 'icons')
const indexDest = join(destDir, 'index.d.ts')

async function main() {
  // Copy only the generated declaration files (`.d.ts`) into `dist/icons`, so
  // subpath imports resolve their own types. The `.js` sources are compiled to
  // `.mjs` by Rollup and must not be copied here.
  await fse.copy(iconsSrcDir, iconsDestDir, {
    filter: src => fse.statSync(src).isDirectory() || src.endsWith('.d.ts')
  })

  let contents = await fse.readFile(indexSrc, 'utf8')
  contents = contents.replace(/.\/__generated__\//g, './')

  await fse.writeFile(indexDest, contents, 'utf8')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
