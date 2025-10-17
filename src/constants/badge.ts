import type { ColorVariant } from '@/types'

export const BADGE_COLORS: Record<Exclude<ColorVariant, 'custom'>, string> = {
  primary: '#3b82f6',
  secondary: '#6b7280',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6'
}

export const BADGE_DOT_SIZE = '0.5rem'
export const BADGE_DEFAULT_SIZE = '1.25rem'
export const BADGE_ICON_SIZE = '1.25rem'