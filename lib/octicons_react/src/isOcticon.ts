import type {Icon} from './__generated__/icons'

const octiconMarker = Symbol.for('@primer/octicons-react.icon')

export function markOcticon<T extends object>(component: T): T {
  Object.defineProperty(component, octiconMarker, {value: true})
  return component
}

export function isOcticon(component: unknown): component is Icon {
  return (
    component !== null &&
    (typeof component === 'object' || typeof component === 'function') &&
    Reflect.get(component, octiconMarker) === true
  )
}
