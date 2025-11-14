import type { BaseComponentProps, ColorVariant, ComponentSize } from './base'

export type SpinnerVariant = 'circular' | 'dots' | 'bars' | 'pulse'

export interface SpinnerProps extends BaseComponentProps {
  variant?: SpinnerVariant
  color?: ColorVariant
  customColor?: string
  size?: ComponentSize | number
  speed?: 'slow' | 'normal' | 'fast'
  label?: string
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
}
