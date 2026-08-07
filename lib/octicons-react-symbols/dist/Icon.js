import { c } from "react-compiler-runtime";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Icon.tsx
const sizeMap = {
	small: 16,
	medium: 32,
	large: 64
};
const Icon = /*#__PURE__*/ forwardRef(function Icon(t0, ref) {
	const $ = c(39);
	let ariaLabel;
	let ariaLabelledBy;
	let id;
	let rest;
	let sizes;
	let style;
	let t1;
	let t2;
	let t3;
	let tabIndex;
	let title;
	if ($[0] !== t0) {
		({"aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, className: t1, fill: t2, id, size: t3, sizes, style, tabIndex, title, ...rest} = t0);
		$[0] = t0;
		$[1] = ariaLabel;
		$[2] = ariaLabelledBy;
		$[3] = id;
		$[4] = rest;
		$[5] = sizes;
		$[6] = style;
		$[7] = t1;
		$[8] = t2;
		$[9] = t3;
		$[10] = tabIndex;
		$[11] = title;
	} else {
		ariaLabel = $[1];
		ariaLabelledBy = $[2];
		id = $[3];
		rest = $[4];
		sizes = $[5];
		style = $[6];
		t1 = $[7];
		t2 = $[8];
		t3 = $[9];
		tabIndex = $[10];
		title = $[11];
	}
	const className = t1 === void 0 ? "" : t1;
	const fill = t2 === void 0 ? "currentColor" : t2;
	const size = t3 === void 0 ? 16 : t3;
	const height = typeof size === "number" ? size : sizeMap[size];
	let t4;
	if ($[12] !== height || $[13] !== sizes) {
		t4 = closestNaturalHeight(Object.keys(sizes), height);
		$[12] = height;
		$[13] = sizes;
		$[14] = t4;
	} else t4 = $[14];
	const naturalHeight = t4;
	const naturalWidth = sizes[naturalHeight].width;
	const width = height * (naturalWidth / naturalHeight);
	const symbolId = sizes[naturalHeight].id;
	const labelled = ariaLabel || ariaLabelledBy;
	const role = labelled ? "img" : void 0;
	const t5 = labelled ? void 0 : "true";
	const t6 = tabIndex !== void 0 && tabIndex >= 0 ? "true" : "false";
	const t7 = `0 0 ${naturalWidth} ${naturalHeight}`;
	let t8;
	if ($[15] !== style) {
		t8 = {
			verticalAlign: "text-bottom",
			...style
		};
		$[15] = style;
		$[16] = t8;
	} else t8 = $[16];
	let t9;
	if ($[17] !== title) {
		t9 = title ? /*#__PURE__*/ jsx("title", { children: title }) : null;
		$[17] = title;
		$[18] = t9;
	} else t9 = $[18];
	const t10 = `#${symbolId}`;
	let t11;
	if ($[19] !== t10) {
		t11 = /*#__PURE__*/ jsx("use", { href: t10 });
		$[19] = t10;
		$[20] = t11;
	} else t11 = $[20];
	let t12;
	if ($[21] !== ariaLabel || $[22] !== ariaLabelledBy || $[23] !== className || $[24] !== fill || $[25] !== height || $[26] !== id || $[27] !== ref || $[28] !== rest || $[29] !== role || $[30] !== t11 || $[31] !== t5 || $[32] !== t6 || $[33] !== t7 || $[34] !== t8 || $[35] !== t9 || $[36] !== tabIndex || $[37] !== width) {
		t12 = /*#__PURE__*/ jsxs("svg", {
			...rest,
			ref,
			"data-component": "Octicon",
			"aria-hidden": t5,
			tabIndex,
			focusable: t6,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
			className,
			role,
			viewBox: t7,
			width,
			height,
			fill,
			id,
			display: "inline-block",
			overflow: "visible",
			style: t8,
			children: [t9, t11]
		});
		$[21] = ariaLabel;
		$[22] = ariaLabelledBy;
		$[23] = className;
		$[24] = fill;
		$[25] = height;
		$[26] = id;
		$[27] = ref;
		$[28] = rest;
		$[29] = role;
		$[30] = t11;
		$[31] = t5;
		$[32] = t6;
		$[33] = t7;
		$[34] = t8;
		$[35] = t9;
		$[36] = tabIndex;
		$[37] = width;
		$[38] = t12;
	} else t12 = $[38];
	return t12;
});
function closestNaturalHeight(naturalHeights, height) {
	const parsed = naturalHeights.map((naturalHeight) => parseInt(naturalHeight, 10));
	return parsed.reduce((acc, naturalHeight) => {
		return naturalHeight <= height ? naturalHeight : acc;
	}, parsed[0]);
}
//#endregion
export { Icon };
