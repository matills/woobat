import type { Component } from 'vue'
import type { BaseComponentProps, ColorVariant } from './base'

export type BadgePosition = 'top' | 'bottom' | 'left' | 'right'

export type BadgeAlignment = 'start' | 'center' | 'end'

export type BadgeFormat = 'default' | 'dot'

export interface BadgeProps extends BaseComponentProps {
  content?: string | number
  position?: BadgePosition
  align?: BadgeAlignment
  color?: ColorVariant
  customColor?: string
  textColor?: string
  overlap?: boolean
  format?: BadgeFormat
  max?: number
  showZero?: boolean
  dot?: boolean
  icon?: Component
  bordered?: boolean
  borderColor?: string
  pulse?: boolean
  inline?: boolean
}

export interface BadgeEmits {
  (e: 'click', event: MouseEvent): void
}