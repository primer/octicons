import { c } from "react-compiler-runtime";
import { Fragment, createContext, useContext } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/OcticonSymbols.tsx
const OcticonSymbolsContext = /*#__PURE__*/ createContext(/* @__PURE__ */ new Set());
function OcticonSymbols(t0) {
	const $ = c(10);
	const { children, symbols } = t0;
	const inheritedSymbolIds = useContext(OcticonSymbolsContext);
	let registeredSymbolIds;
	let symbolsToRender;
	if ($[0] !== inheritedSymbolIds || $[1] !== symbols) {
		registeredSymbolIds = new Set(inheritedSymbolIds);
		symbolsToRender = [];
		for (const symbol of symbols) if (!registeredSymbolIds.has(symbol.id)) {
			registeredSymbolIds.add(symbol.id);
			symbolsToRender.push(symbol);
		}
		$[0] = inheritedSymbolIds;
		$[1] = symbols;
		$[2] = registeredSymbolIds;
		$[3] = symbolsToRender;
	} else {
		registeredSymbolIds = $[2];
		symbolsToRender = $[3];
	}
	let t1;
	if ($[4] !== symbolsToRender) {
		t1 = symbolsToRender.length > 0 ? /*#__PURE__*/ jsx("svg", {
			"aria-hidden": "true",
			height: 0,
			width: 0,
			display: "none",
			children: symbolsToRender.map(_temp)
		}) : null;
		$[4] = symbolsToRender;
		$[5] = t1;
	} else t1 = $[5];
	let t2;
	if ($[6] !== children || $[7] !== registeredSymbolIds || $[8] !== t1) {
		t2 = /*#__PURE__*/ jsxs(OcticonSymbolsContext.Provider, {
			value: registeredSymbolIds,
			children: [t1, children]
		});
		$[6] = children;
		$[7] = registeredSymbolIds;
		$[8] = t1;
		$[9] = t2;
	} else t2 = $[9];
	return t2;
}
function _temp(symbol_0) {
	return /*#__PURE__*/ jsx(Fragment, { children: symbol_0.definition }, symbol_0.id);
}
//#endregion
export { OcticonSymbols };
