import type { Component } from 'vue'
import type { BaseComponentProps, ComponentSize, BorderRadius } from './base'

export type ChipVariant = 'filled' | 'outlined' | 'text' | 'tonal'

export interface ChipProps extends BaseComponentProps {
  label?: string
  variant?: ChipVariant
  size?: ComponentSize
  color?: string
  textColor?: string
  borderColor?: string
  iconLeft?: Component | string
  iconRight?: Component | string
  closable?: boolean
  draggable?: boolean
  square?: boolean
  rounded?: BorderRadius
}

export interface ChipEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'close'): void
  (e: 'dragstart', event: DragEvent): void
  (e: 'dragend', event: DragEvent): void
}