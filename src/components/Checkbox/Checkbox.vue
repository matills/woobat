<template>
  <label :class="checkboxClasses">
    <span class="wb-checkbox__wrapper">
      <input
        type="checkbox"
        :class="inputClasses"
        :checked="isChecked"
        :disabled="disabled"
        :name="name"
        @change="handleChange"
      />
      <span 
        class="wb-checkbox__box"
        :style="boxStyles"
      >
        <span v-if="isChecked || indeterminate" class="wb-checkbox__icon">
          <MinusIcon v-if="indeterminate" />
          <CheckIcon v-else />
        </span>
      </span>
    </span>
    
    <span v-if="label || $slots.default" class="wb-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
    
    <span v-if="error && errorMessage" class="wb-checkbox__error">
      {{ errorMessage }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CheckboxProps, CheckboxEmits } from '@/types'
import { useCheckbox } from '@/composables/checkbox/useCheck'
import { CHECKBOX_SIZE, CHECKBOX_BORDER_RADIUS, CHECKBOX_TRANSITION } from '@/constants'
import { CheckIcon, MinusIcon } from './icons'

defineOptions({
  name: 'wb-checkbox'
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  color: 'primary',
  indeterminate: false,
  error: false
})

const emit = defineEmits<CheckboxEmits>()

const { isChecked, baseColor, handleChange } = useCheckbox(props, emit)

const checkboxClasses = computed(() => {
  const classes = ['wb-checkbox']
  if (props.disabled) classes.push('wb-checkbox--disabled')
  if (props.error) classes.push('wb-checkbox--error')
  if (props.class) classes.push(props.class)
  return classes
})

const inputClasses = computed(() => {
  const classes = ['wb-checkbox__input']
  return classes
})

const boxStyles = computed(() => {
  const styles: Record<string, any> = {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderRadius: CHECKBOX_BORDER_RADIUS,
    transition: CHECKBOX_TRANSITION
  }

  if (isChecked.value || props.indeterminate) {
    styles.backgroundColor = baseColor.value
    styles.borderColor = baseColor.value
  } else if (props.error) {
    styles.borderColor = baseColor.value
  }

  return styles
})
</script>

<style scoped>
.wb-checkbox {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
  cursor: pointer;
  user-select: none;
  font-family: system-ui, -apple-system, sans-serif;
}

.wb-checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.wb-checkbox__wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.wb-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.wb-checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid #d1d5db;
  background-color: transparent;
  position: relative;
  cursor: pointer;
}

.wb-checkbox:hover .wb-checkbox__box:not(.wb-checkbox--disabled .wb-checkbox__box) {
  border-color: #9ca3af;
}

.wb-checkbox__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  width: 100%;
  height: 100%;
}

.wb-checkbox__icon :deep(svg) {
  width: 80%;
  height: 80%;
}

.wb-checkbox__label {
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.5;
}

.wb-checkbox--disabled .wb-checkbox__label {
  color: #9ca3af;
}

.wb-checkbox__error {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
}
</style>