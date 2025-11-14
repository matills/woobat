<template>
  <div class="wb-select-wrapper" :class="wrapperClasses">
    <label v-if="label" :for="selectId" class="wb-select-label">
      {{ label }}
      <span v-if="required" class="wb-select-required">*</span>
    </label>

    <div class="wb-select-container" :style="containerStyles">
      <select
        :id="selectId"
        ref="selectRef"
        :class="selectClasses"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :name="name"
        :multiple="multiple"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <option v-if="placeholder && !multiple" value="" disabled selected>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="wb-select-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <div v-if="hint || errorMessage" class="wb-select-message" :class="{ 'wb-select-message--error': error }">
      {{ error && errorMessage ? errorMessage : hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectProps, SelectEmits } from '@/types'
import { useComponentStyles } from '@/composables/useComponentStyles'

defineOptions({
  name: 'wb-select'
})

const props = withDefaults(defineProps<SelectProps>(), {
  size: 'md',
  color: 'primary',
  rounded: 'md',
  error: false,
  required: false,
  multiple: false,
  options: () => []
})

const emit = defineEmits<SelectEmits>()

const selectRef = ref<HTMLSelectElement | null>(null)
const isFocused = ref(false)

const { colorValue, sizeConfig, borderRadiusValue } = useComponentStyles({
  color: props.color,
  customColor: props.customColor,
  size: props.size,
  rounded: props.rounded
})

const selectId = computed(() => props.id || `wb-select-${Math.random().toString(36).substring(2, 9)}`)

const wrapperClasses = computed(() => {
  const classes: string[] = []
  if (props.disabled) classes.push('wb-select-wrapper--disabled')
  if (props.error) classes.push('wb-select-wrapper--error')
  if (props.class) classes.push(props.class)
  return classes
})

const selectClasses = computed(() => {
  const classes = ['wb-select', `wb-select--${props.size}`]
  if (props.error) classes.push('wb-select--error')
  if (props.disabled) classes.push('wb-select--disabled')
  if (props.multiple) classes.push('wb-select--multiple')
  return classes
})

const containerStyles = computed(() => ({
  borderRadius: borderRadiusValue.value,
  borderColor: props.error ? '#ef4444' : (isFocused.value ? colorValue.value : '#d1d5db'),
  padding: sizeConfig.value.padding,
  fontSize: sizeConfig.value.fontSize
}))

const handleChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement
  const value = target.value === '' ? null : (isNaN(Number(target.value)) ? target.value : Number(target.value))
  emit('update:modelValue', value)
  emit('change', event)
}

const handleFocus = (event: FocusEvent): void => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent): void => {
  isFocused.value = false
  emit('blur', event)
}

defineExpose({
  focus: () => selectRef.value?.focus(),
  blur: () => selectRef.value?.blur()
})
</script>

<style scoped>
.wb-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
}

.wb-select-wrapper--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wb-select-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: block;
}

.wb-select-required {
  color: #ef4444;
  margin-left: 0.125rem;
}

.wb-select-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 2px solid;
  transition: all 0.2s ease;
  position: relative;
}

.wb-select-container:hover:not(.wb-select-wrapper--disabled .wb-select-container) {
  border-color: #9ca3af;
}

.wb-select {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: system-ui, -apple-system, sans-serif;
  color: #1f2937;
  padding: 0;
  padding-right: 2rem;
  cursor: pointer;
  appearance: none;
}

.wb-select--multiple {
  padding-right: 0.5rem;
}

.wb-select--disabled {
  cursor: not-allowed;
}

.wb-select option {
  padding: 0.5rem;
}

.wb-select-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
}

.wb-select--multiple + .wb-select-icon {
  display: none;
}

.wb-select-message {
  font-size: 0.75rem;
  color: #6b7280;
}

.wb-select-message--error {
  color: #ef4444;
}
</style>
