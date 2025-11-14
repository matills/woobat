import type { BaseComponentProps, ColorVariant, ComponentSize, BorderRadius } from './base'

export interface TextareaProps extends BaseComponentProps {
  modelValue?: string
  placeholder?: string
  color?: ColorVariant
  customColor?: string
  size?: ComponentSize
  rounded?: BorderRadius
  error?: boolean
  errorMessage?: string
  label?: string
  hint?: string
  readonly?: boolean
  required?: boolean
  rows?: number
  cols?: number
  maxlength?: number
  minlength?: number
  autocomplete?: string
  autofocus?: boolean
  name?: string
  id?: string
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  autoGrow?: boolean
}

export interface TextareaEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
  (e: 'keypress', event: KeyboardEvent): void
}
