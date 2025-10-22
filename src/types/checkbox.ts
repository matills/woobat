import type { BaseComponentProps, ColorVariant } from './base'

export interface CheckboxProps extends BaseComponentProps {
  modelValue?: boolean | unknown[]
  value?: unknown
  label?: string
  color?: ColorVariant
  customColor?: string
  indeterminate?: boolean
  error?: boolean
  errorMessage?: string
  name?: string
  trueValue?: unknown
  falseValue?: unknown
}

export interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean | unknown[]): void
  (e: 'change', value: boolean | unknown[]): void
}