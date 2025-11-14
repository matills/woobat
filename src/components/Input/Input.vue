<template>
  <div class="wb-input-wrapper" :class="wrapperClasses">
    <label v-if="label" :for="inputId" class="wb-input-label">
      {{ label }}
      <span v-if="required" class="wb-input-required">*</span>
    </label>

    <div class="wb-input-container" :style="containerStyles">
      <div v-if="$slots.prefix || prefixIcon" class="wb-input-prefix">
        <slot name="prefix">
          <wb-icon v-if="prefixIcon" :name="prefixIcon" :size="iconSize" />
        </slot>
      </div>

      <input
        :id="inputId"
        ref="inputRef"
        :class="inputClasses"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxlength"
        :minlength="minlength"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :name="name"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
      />

      <div v-if="$slots.suffix || suffixIcon || (clearable && modelValue)" class="wb-input-suffix">
        <slot name="suffix">
          <button
            v-if="clearable && modelValue && !disabled && !readonly"
            type="button"
            class="wb-input-clear"
            @click="handleClear"
          >
            <wb-icon name="x" :size="iconSize" />
          </button>
          <wb-icon v-else-if="suffixIcon" :name="suffixIcon" :size="iconSize" />
        </slot>
      </div>
    </div>

    <div v-if="hint || errorMessage" class="wb-input-message" :class="{ 'wb-input-message--error': error }">
      {{ error && errorMessage ? errorMessage : hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InputProps, InputEmits } from '@/types'
import { useComponentStyles } from '@/composables/useComponentStyles'

defineOptions({
  name: 'wb-input'
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  color: 'primary',
  rounded: 'md',
  error: false,
  clearable: false,
  readonly: false,
  required: false,
  autofocus: false
})

const emit = defineEmits<InputEmits>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

const { colorValue, sizeConfig, borderRadiusValue } = useComponentStyles({
  color: props.color,
  customColor: props.customColor,
  size: props.size,
  rounded: props.rounded
})

const inputId = computed(() => props.id || `wb-input-${Math.random().toString(36).substring(2, 9)}`)

const iconSize = computed(() => {
  const sizeMap: Record<string, number> = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22
  }
  return sizeMap[props.size || 'md']
})

const wrapperClasses = computed(() => {
  const classes: string[] = []
  if (props.disabled) classes.push('wb-input-wrapper--disabled')
  if (props.error) classes.push('wb-input-wrapper--error')
  if (props.class) classes.push(props.class)
  return classes
})

const inputClasses = computed(() => {
  const classes = ['wb-input', `wb-input--${props.size}`]
  if (props.error) classes.push('wb-input--error')
  if (props.disabled) classes.push('wb-input--disabled')
  if (props.readonly) classes.push('wb-input--readonly')
  return classes
})

const containerStyles = computed(() => ({
  borderRadius: borderRadiusValue.value,
  borderColor: props.error ? '#ef4444' : (isFocused.value ? colorValue.value : '#d1d5db'),
  padding: sizeConfig.value.padding,
  fontSize: sizeConfig.value.fontSize
}))

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? parseFloat(target.value) : target.value)
  emit('input', event)
}

const handleChange = (event: Event): void => {
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

const handleClear = (): void => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

const handleKeydown = (event: KeyboardEvent): void => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent): void => {
  emit('keyup', event)
}

const handleKeypress = (event: KeyboardEvent): void => {
  emit('keypress', event)
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<style scoped>
.wb-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
}

.wb-input-wrapper--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wb-input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: block;
}

.wb-input-required {
  color: #ef4444;
  margin-left: 0.125rem;
}

.wb-input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ffffff;
  border: 2px solid;
  transition: all 0.2s ease;
  position: relative;
}

.wb-input-container:hover:not(.wb-input-wrapper--disabled .wb-input-container) {
  border-color: #9ca3af;
}

.wb-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: system-ui, -apple-system, sans-serif;
  color: #1f2937;
  padding: 0;
}

.wb-input::placeholder {
  color: #9ca3af;
}

.wb-input--disabled {
  cursor: not-allowed;
}

.wb-input--readonly {
  cursor: default;
}

.wb-input-prefix,
.wb-input-suffix {
  display: flex;
  align-items: center;
  color: #6b7280;
}

.wb-input-clear {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #6b7280;
  transition: color 0.2s ease;
}

.wb-input-clear:hover {
  color: #374151;
}

.wb-input-message {
  font-size: 0.75rem;
  color: #6b7280;
}

.wb-input-message--error {
  color: #ef4444;
}

/* Hide spinner buttons for number input */
.wb-input[type='number']::-webkit-inner-spin-button,
.wb-input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.wb-input[type='number'] {
  -moz-appearance: textfield;
}
</style>
