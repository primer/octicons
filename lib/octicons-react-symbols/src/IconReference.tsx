import {
  forwardRef,
  Fragment,
  type ForwardRefExoticComponent,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
  type SVGProps,
} from 'react'
import {Icon} from './Icon'
import type {OcticonReferenceProps} from './types'

interface OcticonSymbol {
  /**
   * The unique identifier for the symbol. This is used to reference the symbol in the SVG `<use>` element.
   */
  readonly id: string

  /**
   * The SVG definition of the symbol. This is the SVG content that will be rendered when the symbol is used.
   */
  readonly definition: ReactNode
}

interface IconReferenceSize {
  readonly definition: ReactElement<SVGProps<SVGSymbolElement>>
  readonly id: string
  readonly width: number
}

interface CreateIconReferenceOptions {
  /**
   * The unique identifier for the symbol.
   */
  readonly id: string

  /**
   * The name to use for the icon reference component in React DevTools.
   */
  readonly name?: string

  /**
   * The available natural sizes for the icon.
   */
  readonly sizes: Readonly<Record<string, IconReferenceSize>>
}

type IconReference = ForwardRefExoticComponent<OcticonReferenceProps & RefAttributes<SVGSVGElement>>
type IconReferenceResult = readonly [OcticonSymbol, IconReference]

/**
 * Creates an Octicon symbol and its matching icon reference component.
 */
function createIconReference({id, name, sizes}: CreateIconReferenceOptions): IconReferenceResult {
  const sizeEntries = Object.entries(sizes)
  const symbol = {
    id,
    definition: sizeEntries.map(([size, {definition}]) => {
      return <Fragment key={size}>{definition}</Fragment>
    }),
  }
  const iconSizes = Object.fromEntries(
    sizeEntries.map(([size, {id: sizeId, width}]) => {
      return [
        size,
        {
          id: sizeId,
          width,
        },
      ]
    }),
  )

  const IconReference = forwardRef<SVGSVGElement, OcticonReferenceProps>(function IconReference(props, ref) {
    return <Icon {...props} ref={ref} sizes={iconSizes} />
  })
  IconReference.displayName = name

  return [symbol, IconReference]
}

export {createIconReference}
export type {CreateIconReferenceOptions, IconReference, IconReferenceResult, IconReferenceSize, OcticonSymbol}
