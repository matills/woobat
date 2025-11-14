import type { BaseComponentProps, ColorVariant, ComponentSize, BorderRadius } from './base'

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local'

export interface InputProps extends BaseComponentProps {
  modelValue?: string | number
  type?: InputType
  placeholder?: string
  color?: ColorVariant
  customColor?: string
  size?: ComponentSize
  rounded?: BorderRadius
  error?: boolean
  errorMessage?: string
  label?: string
  hint?: string
  clearable?: boolean
  readonly?: boolean
  required?: boolean
  min?: number | string
  max?: number | string
  step?: number | string
  maxlength?: number
  minlength?: number
  pattern?: string
  autocomplete?: string
  autofocus?: boolean
  name?: string
  id?: string
  prefixIcon?: string
  suffixIcon?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'clear'): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
  (e: 'keypress', event: KeyboardEvent): void
}
