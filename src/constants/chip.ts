import type { ComponentSize, BorderRadius } from '@/types'

export const CHIP_SIZES: Record<ComponentSize, { padding: string; fontSize: string; height: string; gap: string }> = {
  xs: { padding: '0.125rem 0.375rem', fontSize: '0.625rem', height: '1.25rem', gap: '0.25rem' },
  sm: { padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: '1.5rem', gap: '0.25rem' },
  md: { padding: '0.375rem 0.75rem', fontSize: '0.875rem', height: '2rem', gap: '0.375rem' },
  lg: { padding: '0.5rem 1rem', fontSize: '1rem', height: '2.5rem', gap: '0.5rem' },
  xl: { padding: '0.625rem 1.25rem', fontSize: '1.125rem', height: '3rem', gap: '0.5rem' }
}

export const CHIP_ROUNDED: Record<BorderRadius, string> = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px'
}

export const CHIP_DEFAULT_COLOR = '#6b7280'