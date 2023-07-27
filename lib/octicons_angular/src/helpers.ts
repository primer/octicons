export type SVGSize = 'small'|'medium'|'large';

export interface SVGData {
 [key: string]: {
   width: number,
   paths: string[],
 };
};

export const sizeMap = {
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
  const height = sizeMap[size]
  const { paths } = data[height];
  return `<svg
    height="${height}px"
    ${Object.keys(extraAttributes).reduce((attr, total) => `${total} ${attr}="${extraAttributes[attr]}"`, '')}
  >
    ${paths.map(p => `<path d="${p}"></path>`)}
  </svg>`
}
