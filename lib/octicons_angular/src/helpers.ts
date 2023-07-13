function closestNaturalHeight(naturalHeights:string[], height:number) {
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc), parseInt(naturalHeights[0], 10))
}
