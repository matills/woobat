import './styles/index.css'
export { default, WoobatUI } from './plugin'
export * from './components'

export { useTheme, useCurrentTheme } from './composables/useTheme'
export { useRipple } from './composables/useRipple'
export type { UseThemeReturn } from './composables/useTheme'
export type { UseRippleReturn, RippleOptions } from './composables/useRipple'

export type * from './types/global'

export type * from './components/Button/Button.types'