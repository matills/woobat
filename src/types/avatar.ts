import type { Component } from 'vue'
import type { BaseComponentProps, ComponentSize, ColorVariant, BorderRadius } from './base'

export type AvatarSize = ComponentSize | number | string

export interface AvatarProps extends BaseComponentProps {
  size?: AvatarSize
  color?: ColorVariant
  customColor?: string
  textColor?: string
  rounded?: BorderRadius
  tile?: boolean
  src?: string
  alt?: string
  icon?: Component | string
  text?: string
  loading?: boolean
  elevation?: number
  bordered?: boolean
  borderColor?: string
  borderWidth?: number | string
}

export interface AvatarEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'error', event: Event): void
  (e: 'load', event: Event): void
}