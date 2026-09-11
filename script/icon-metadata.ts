import {createHash} from 'node:crypto'
import type {INode} from 'svgson'

export type IconData = {
  name: string
  keywords: Array<string>
  heights: Record<string, {width: number; path: string; ast: INode}>
  defaultHeight?: number
  aliasOf?: string
  deprecated?: boolean
}

type GeometryNode = {
  name: string
  type: string
  value: string
  attributes: Record<string, string>
  children: Array<GeometryNode>
}

export function pascalCase(name: string) {
  return name.replace(/(^|-)([a-z])/g, (_match, _separator, character: string) => character.toUpperCase())
}

export function geometryFingerprint(ast: INode): string {
  function normalize(node: INode): GeometryNode {
    return {
      name: node.name,
      type: node.type,
      value: node.value.trim(),
      attributes: Object.fromEntries(
        Object.keys(node.attributes)
          .sort()
          .map(key => [key, node.attributes[key]]),
      ),
      children: node.children.filter(child => child.type === 'element' || child.value.trim().length > 0).map(normalize),
    }
  }

  return createHash('sha256')
    .update(JSON.stringify(normalize(ast)))
    .digest('hex')
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function validateFields(value: Record<string, unknown>, allowed: Array<string>, context: string) {
  for (const field of Object.keys(value)) {
    if (!allowed.includes(field)) {
      throw new Error(`${context}: Unknown metadata field "${field}".`)
    }
  }
}

export function applyIconMetadata(
  icons: Record<string, IconData>,
  metadata: unknown,
  keywords: Record<string, Array<string>> = {},
): Record<string, IconData> {
  if (!isRecord(metadata)) {
    throw new Error('Icon metadata must be an object keyed by canonical icon name.')
  }

  const result = structuredClone(icons)
  const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

  for (const [name, config] of Object.entries(metadata)) {
    if (!namePattern.test(name) || !isRecord(config)) {
      throw new Error(`Invalid metadata for "${name}".`)
    }
    validateFields(config, ['aliases', 'defaultHeight', 'protectedGeometry'], name)
    if (!Object.hasOwn(icons, name)) {
      throw new Error(`Metadata target "${name}" has no source SVGs.`)
    }
    const icon = result[name]

    if (config.defaultHeight !== undefined) {
      const height = config.defaultHeight
      if (typeof height !== 'number' || !Number.isInteger(height) || !Object.hasOwn(icon.heights, height)) {
        throw new Error(`${name}: defaultHeight must name an available natural height.`)
      }
      icon.defaultHeight = height
    }

    if (config.protectedGeometry !== undefined) {
      if (!isRecord(config.protectedGeometry)) {
        throw new Error(`${name}: protectedGeometry must map natural heights to SHA-256 fingerprints.`)
      }
      for (const [height, fingerprint] of Object.entries(config.protectedGeometry)) {
        if (typeof fingerprint !== 'string' || !/^[a-f0-9]{64}$/.test(fingerprint)) {
          throw new Error(`${name}-${height}: Invalid geometry fingerprint.`)
        }
        if (!Object.hasOwn(icon.heights, height)) {
          throw new Error(`${name}: Protected height ${height} has no source SVG.`)
        }
        if (geometryFingerprint(icon.heights[height].ast) !== fingerprint) {
          throw new Error(
            `${name}-${height}.svg differs from its approved geometry. Use a distinct icon name for different artwork, or explicitly review an update to the protected baseline.`,
          )
        }
      }
    }

    if (config.aliases === undefined) continue
    if (!isRecord(config.aliases)) {
      throw new Error(`${name}: aliases must be an object keyed by legacy icon name.`)
    }
    for (const [alias, options] of Object.entries(config.aliases)) {
      if (!namePattern.test(alias) || !isRecord(options)) {
        throw new Error(`${name}: Invalid alias "${alias}".`)
      }
      validateFields(options, ['heights', 'deprecated'], alias)
      if (Object.hasOwn(icons, alias)) {
        throw new Error(
          `Alias "${alias}" conflicts with a source icon. Use the canonical source name "${name}"; different artwork needs a distinct name.`,
        )
      }
      if (Object.hasOwn(result, alias) || Object.hasOwn(metadata, alias)) {
        throw new Error(`Alias "${alias}" conflicts with another alias or canonical metadata target.`)
      }
      if (!Array.isArray(options.heights) || options.heights.length === 0) {
        throw new Error(`${alias}: heights must be a nonempty array of natural heights.`)
      }
      const heights = options.heights.map((height: unknown) => {
        if (typeof height !== 'number' || !Number.isInteger(height) || !Object.hasOwn(icon.heights, height)) {
          throw new Error(`${alias}: Each height must name an available natural height of "${name}".`)
        }
        return height
      })
      if (new Set(heights).size !== heights.length) {
        throw new Error(`${alias}: heights must not contain duplicates.`)
      }
      if (options.deprecated !== undefined && typeof options.deprecated !== 'boolean') {
        throw new Error(`${alias}: deprecated must be a boolean.`)
      }
      result[alias] = {
        name: alias,
        keywords: [...(keywords[alias] ?? icon.keywords)],
        heights: Object.fromEntries(heights.map(height => [height, structuredClone(icon.heights[height])])),
        aliasOf: name,
        ...(options.deprecated ? {deprecated: true} : {}),
      }
    }
  }

  return result
}
