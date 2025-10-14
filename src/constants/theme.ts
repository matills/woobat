import type { ColorVariant, ComponentSize, BorderRadius, ElevationLevel, SizeConfig } from '@/types'

export const THEME_COLORS: Record<Exclude<ColorVariant, 'custom'>, string> = {
  primary: '#3b82f6',
  secondary: '#6b7280',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6'
}

export const COMPONENT_SIZES: Record<ComponentSize, SizeConfig> = {
  xs: { padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: '1.75rem' },
  sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem', height: '2rem' },
  md: { padding: '0.5rem 1rem', fontSize: '0.875rem', height: '2.5rem' },
  lg: { padding: '0.625rem 1.25rem', fontSize: '1rem', height: '3rem' },
  xl: { padding: '0.75rem 1.5rem', fontSize: '1.125rem', height: '3.5rem' }
}

export const BORDER_RADIUS: Record<BorderRadius, string> = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px'
}

export const ELEVATION: Record<ElevationLevel, string> = {
  0: 'none',
  1: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  2: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  3: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  4: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  5: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
}