import type { BaseComponentProps, BorderRadius, ElevationLevel } from './base'

export type CardVariant = 'elevated' | 'outlined' | 'filled'

export interface CardProps extends BaseComponentProps {
  variant?: CardVariant
  rounded?: BorderRadius
  elevation?: ElevationLevel
  padding?: string
  hoverable?: boolean
  clickable?: boolean
}

export interface CardEmits {
  (e: 'click', event: MouseEvent): void
}
