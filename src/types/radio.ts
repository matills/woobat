import type { BaseComponentProps, ColorVariant, ComponentSize } from './base'

export interface RadioProps extends BaseComponentProps {
  modelValue?: string | number | boolean
  value?: string | number | boolean
  label?: string
  color?: ColorVariant
  customColor?: string
  size?: ComponentSize
  name?: string
  id?: string
  required?: boolean
}

export interface RadioEmits {
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
