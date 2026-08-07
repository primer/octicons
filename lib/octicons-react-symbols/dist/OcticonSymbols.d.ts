import { OcticonSymbol } from "./IconReference.js";
import { ReactNode } from "react";

//#region src/OcticonSymbols.d.ts
interface OcticonSymbolsProps {
  children?: ReactNode;
  symbols: ReadonlyArray<OcticonSymbol>;
}
declare function OcticonSymbols({
  children,
  symbols
}: OcticonSymbolsProps): import("react").JSX.Element;
//#endregion
export { OcticonSymbols, type OcticonSymbolsProps };