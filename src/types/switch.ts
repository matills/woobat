import type { BaseComponentProps, ColorVariant, ComponentSize } from './base'

export interface SwitchProps extends BaseComponentProps {
  modelValue?: boolean
  label?: string
  color?: ColorVariant
  customColor?: string
  size?: ComponentSize
  name?: string
  id?: string
  required?: boolean
  labelPosition?: 'left' | 'right'
}

export interface SwitchEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean, event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
