import { computed } from 'vue'
import type { CheckboxProps, CheckboxEmits } from '@/types'
import { CHECKBOX_COLORS } from '@/constants'

export const useCheckbox = (
  props: CheckboxProps,
  emit: CheckboxEmits
) => {
  const isGrouped = computed(() => Array.isArray(props.modelValue))

  const isChecked = computed(() => {
    if (isGrouped.value) {
      const arr = props.modelValue as unknown[]
      return arr.includes(props.value)
    }
    
    if (props.trueValue !== undefined) {
      return props.modelValue === props.trueValue
    }
    
    return Boolean(props.modelValue)
  })

  const baseColor = computed(() => {
    if (props.error) return CHECKBOX_COLORS.error
    if (props.customColor) return props.customColor
    if (props.color === 'custom') return CHECKBOX_COLORS.primary
    return CHECKBOX_COLORS[props.color || 'primary']
  })

  const handleChange = (): void => {
    if (props.disabled) return

    let newValue: boolean | unknown[]

    if (isGrouped.value) {
      const arr = [...(props.modelValue as unknown[])]
      const index = arr.indexOf(props.value)
      
      if (index > -1) {
        arr.splice(index, 1)
      } else {
        arr.push(props.value)
      }
      
      newValue = arr
    } else {
      if (props.trueValue !== undefined && props.falseValue !== undefined) {
        newValue = isChecked.value ? props.falseValue : props.trueValue
      } else {
        newValue = !isChecked.value
      }
    }

    emit('update:modelValue', newValue)
    emit('change', newValue)
  }

  return {
    isChecked,
    isGrouped,
    baseColor,
    handleChange
  }
}