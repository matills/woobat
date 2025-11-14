import type { BaseComponentProps, ColorVariant, ComponentSize, BorderRadius } from './base'

export type ProgressVariant = 'linear' | 'circular'

export interface ProgressProps extends BaseComponentProps {
  value?: number
  max?: number
  variant?: ProgressVariant
  color?: ColorVariant
  customColor?: string
  size?: ComponentSize
  rounded?: BorderRadius
  height?: string
  showLabel?: boolean
  indeterminate?: boolean
  striped?: boolean
  animated?: boolean
}
