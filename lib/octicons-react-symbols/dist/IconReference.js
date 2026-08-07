import { Icon } from "./Icon.js";
import { c } from "react-compiler-runtime";
import { Fragment, forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/IconReference.tsx
/**
* Creates an Octicon symbol and its matching icon reference component.
*/
function createIconReference({ id, name, sizes }) {
	const sizeEntries = Object.entries(sizes);
	const symbol = {
		id,
		definition: sizeEntries.map(([size, { definition }]) => {
			return /*#__PURE__*/ jsx(Fragment, { children: definition }, size);
		})
	};
	const iconSizes = Object.fromEntries(sizeEntries.map(([size, { id: sizeId, width }]) => {
		return [size, {
			id: sizeId,
			width
		}];
	}));
	const IconReference = /*#__PURE__*/ forwardRef(function IconReference(props, ref) {
		const $ = c(3);
		let t0;
		if ($[0] !== props || $[1] !== ref) {
			t0 = /*#__PURE__*/ jsx(Icon, {
				...props,
				ref,
				sizes: iconSizes
			});
			$[0] = props;
			$[1] = ref;
			$[2] = t0;
		} else t0 = $[2];
		return t0;
	});
	IconReference.displayName = name;
	return [symbol, IconReference];
}
//#endregion
export { createIconReference };
