import type { Component } from 'vue'
import type { BaseComponentProps, ComponentSize } from './base'

export type IconRotation = 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315

export type IconFlip = 'horizontal' | 'vertical' | 'both' | 'none'

export interface IconProps extends BaseComponentProps {
  icon?: Component | string
  color?: string
  size?: ComponentSize | number | string
  rotation?: IconRotation
  flip?: IconFlip
  spin?: boolean
  pulse?: boolean
}

export interface IconEmits {
  (e: 'click', event: MouseEvent): void
}