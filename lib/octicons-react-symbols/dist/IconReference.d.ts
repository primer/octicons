import { OcticonReferenceProps } from "./types.js";
import { ForwardRefExoticComponent, ReactElement, ReactNode, RefAttributes, SVGProps } from "react";

//#region src/IconReference.d.ts
interface OcticonSymbol {
  /**
   * The unique identifier for the symbol. This is used to reference the symbol in the SVG `<use>` element.
   */
  readonly id: string;
  /**
   * The SVG definition of the symbol. This is the SVG content that will be rendered when the symbol is used.
   */
  readonly definition: ReactNode;
}
interface IconReferenceSize {
  readonly definition: ReactElement<SVGProps<SVGSymbolElement>>;
  readonly id: string;
  readonly width: number;
}
interface CreateIconReferenceOptions {
  /**
   * The unique identifier for the symbol.
   */
  readonly id: string;
  /**
   * The name to use for the icon reference component in React DevTools.
   */
  readonly name?: string;
  /**
   * The available natural sizes for the icon.
   */
  readonly sizes: Readonly<Record<string, IconReferenceSize>>;
}
type IconReference = ForwardRefExoticComponent<OcticonReferenceProps & RefAttributes<SVGSVGElement>>;
type IconReferenceResult = readonly [OcticonSymbol, IconReference];
/**
 * Creates an Octicon symbol and its matching icon reference component.
 */
declare function createIconReference({
  id,
  name,
  sizes
}: CreateIconReferenceOptions): IconReferenceResult;
//#endregion
export { type CreateIconReferenceOptions, type IconReference, type IconReferenceResult, type IconReferenceSize, type OcticonSymbol, createIconReference };