export type SVGSize = 'xsmall'|'small'|'medium'|'large';

export interface SVGData {
 [key: string]: {
   width: number,
   paths: string[],
 };
};

export const sizeMap = {
  xsmall: 12,
  small: 16,
  medium: 32,
  large: 64
};

export function closestNaturalHeight(naturalHeights:string[], height:number) {
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc), parseInt(naturalHeights[0], 10))
}

export function toDOMString(data:SVGData, size:SVGSize = 'medium', extraAttributes:Record<string, string> = {}) {
  const height = sizeMap[size];
  const naturalHeight = closestNaturalHeight(Object.keys(data), height)
  const { width, paths } = data[naturalHeight.toString()];
  const elWidth =  height * (width / naturalHeight);
  return `<svg
    viewBox="0 0 ${elWidth} ${naturalHeight}"
    ${Object.keys(extraAttributes).reduce((total, attr) => `${total} ${attr}="${extraAttributes[attr]}"`, '')}
  >
    ${paths.map(p => `<path d="${p}"></path>`)}
  </svg>`
}
