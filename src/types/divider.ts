import type { BaseComponentProps, ColorVariant } from './base'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerAlign = 'left' | 'center' | 'right'

export interface DividerProps extends BaseComponentProps {
  orientation?: DividerOrientation
  color?: ColorVariant
  customColor?: string
  thickness?: string
  length?: string
  spacing?: string
  text?: string
  textAlign?: DividerAlign
  dashed?: boolean
}
