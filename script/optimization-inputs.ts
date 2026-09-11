import path from 'node:path'
import {pathToFileURL} from 'node:url'
import metadata from '../icon-metadata.json' with {type: 'json'}

type OptimizationMetadata = Record<
  string,
  {
    aliases?: Record<string, {heights: Array<number>}>
    protectedGeometry?: Record<string, string>
    defaultHeight?: number
  }
>

export function selectOptimizableIcons(files: Array<string>, iconMetadata: OptimizationMetadata): Array<string> {
  const preserved = new Set<string>()

  for (const [name, config] of Object.entries(iconMetadata)) {
    const heights = new Set(Object.keys(config.protectedGeometry ?? {}))
    for (const alias of Object.values(config.aliases ?? {})) {
      for (const height of alias.heights) heights.add(String(height))
    }
    for (const height of heights) preserved.add(`${name}-${height}.svg`)
  }

  return files.filter(file => !preserved.has(path.basename(file)))
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const input = process.env.CHANGED_ICONS
  if (input === undefined) throw new Error('CHANGED_ICONS must contain the changed SVG paths.')
  const files = input.split(/\r?\n/).filter(file => file.length > 0)
  for (const file of files) {
    if (!file.startsWith('icons/') || !file.endsWith('.svg') || path.posix.normalize(file) !== file) {
      throw new Error(`Invalid source SVG path: ${file}`)
    }
  }

  const selected = selectOptimizableIcons(files, metadata)
  const selectedSet = new Set(selected)
  for (const file of files) {
    if (!selectedSet.has(file)) {
      console.error(`Preserve compatibility or protected SVG bytes: ${file}`)
    }
  }
  process.stdout.write(selected.join('\n'))
}
