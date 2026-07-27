// eslint-disable-next-line import/no-namespace
import * as styledSystem from 'styled-system'
import getCss from '@styled-system/css'

export const COMMON = styledSystem.compose(styledSystem.space, styledSystem.color)

export const sx = props => getCss(props.sx)
