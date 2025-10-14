export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'custom'

export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5

export interface BaseComponentProps {
  disabled?: boolean
  class?: string
  style?: Record<string, any> | string
}

export interface BaseComponentEmits {
  (e: 'click', event: MouseEvent): void
}

export interface SizeConfig {
  padding: string
  fontSize: string
  height: string
}