import type { Component, CSSProperties } from 'vue'
import type { BaseComponentProps, ComponentSize, ColorVariant, BorderRadius, ElevationLevel } from './base'

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal'

export interface ClickZone {
  area: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  action: () => void
  label?: string
}

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant
  size?: ComponentSize
  color?: ColorVariant
  customColor?: string
  textColor?: string
  borderColor?: string
  iconColor?: string
  block?: boolean
  rounded?: BorderRadius
  elevation?: ElevationLevel
  loading?: boolean
  loadingText?: string
  showLoadingText?: boolean
  preserveText?: boolean
  ripple?: boolean
  iconLeft?: Component | string
  iconRight?: Component | string
  iconOnly?: boolean
  padding?: string | number | 'none'
  noPadding?: boolean
  tag?: 'button' | 'a' | 'router-link' | 'nuxt-link'
  href?: string
  target?: string
  to?: string | object
  type?: 'button' | 'submit' | 'reset'
  clickZones?: ClickZone[]
  detectQuadrant?: boolean
  clickAnimation?: 'scale' | 'shake' | 'pulse' | 'bounce' | 'none'
  animationDuration?: number
  contentClass?: string
  contentStyle?: CSSProperties | string
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'zone-click', zone: string, event: MouseEvent): void
}