import type { Component } from 'vue'
import type { BaseComponentProps } from './base'

export type AlertVariant = 'color' | 'outlined' | 'border'

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'custom'

export type BorderPosition = 'top' | 'right' | 'bottom' | 'left'

export interface AlertProps extends BaseComponentProps {
  variant?: AlertVariant
  type?: AlertType
  border?: BorderPosition
  color?: string
  colorText?: string
  padding?: string
  closable?: boolean
  title?: string
  icon?: boolean
  center?: boolean
  customIcon?: Component
}

export interface AlertEmits {
  (e: 'close'): void
}