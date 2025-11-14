import type { BaseComponentProps, ColorVariant, ComponentSize, BorderRadius } from './base'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface SelectProps extends BaseComponentProps {
  modelValue?: string | number | null
  options?: SelectOption[]
  placeholder?: string
  color?: ColorVariant
  customColor?: string
  size?: ComponentSize
  rounded?: BorderRadius
  error?: boolean
  errorMessage?: string
  label?: string
  hint?: string
  required?: boolean
  name?: string
  id?: string
  multiple?: boolean
}

export interface SelectEmits {
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', event: Event): void
}
