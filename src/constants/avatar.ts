import type { ComponentSize } from '@/types'
import { THEME_COLORS } from './theme'

export const AVATAR_COLORS = THEME_COLORS

export const AVATAR_SIZES: Record<ComponentSize, string> = {
  xs: '1.5rem',
  sm: '2rem',
  md: '2.5rem',
  lg: '3.5rem',
  xl: '5rem'
}

export const AVATAR_FONT_SIZES: Record<ComponentSize, string> = {
  xs: '0.625rem',
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1.25rem',
  xl: '1.875rem'
}