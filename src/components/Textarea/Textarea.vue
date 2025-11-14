<template>
  <div class="wb-textarea-wrapper" :class="wrapperClasses">
    <label v-if="label" :for="textareaId" class="wb-textarea-label">
      {{ label }}
      <span v-if="required" class="wb-textarea-required">*</span>
    </label>

    <div class="wb-textarea-container" :style="containerStyles">
      <textarea
        :id="textareaId"
        ref="textareaRef"
        :class="textareaClasses"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :cols="cols"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :name="name"
        :style="textareaStyles"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
      />
    </div>

    <div v-if="hint || errorMessage" class="wb-textarea-message" :class="{ 'wb-textarea-message--error': error }">
      {{ error && errorMessage ? errorMessage : hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import type { TextareaProps, TextareaEmits } from '@/types'
import { useComponentStyles } from '@/composables/useComponentStyles'

defineOptions({
  name: 'wb-textarea'
})

const props = withDefaults(defineProps<TextareaProps>(), {
  size: 'md',
  color: 'primary',
  rounded: 'md',
  error: false,
  readonly: false,
  required: false,
  autofocus: false,
  rows: 3,
  resize: 'vertical',
  autoGrow: false
})

const emit = defineEmits<TextareaEmits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const isFocused = ref(false)

const { colorValue, sizeConfig, borderRadiusValue } = useComponentStyles({
  color: props.color,
  customColor: props.customColor,
  size: props.size,
  rounded: props.rounded
})

const textareaId = computed(() => props.id || `wb-textarea-${Math.random().toString(36).substring(2, 9)}`)

const wrapperClasses = computed(() => {
  const classes: string[] = []
  if (props.disabled) classes.push('wb-textarea-wrapper--disabled')
  if (props.error) classes.push('wb-textarea-wrapper--error')
  if (props.class) classes.push(props.class)
  return classes
})

const textareaClasses = computed(() => {
  const classes = ['wb-textarea', `wb-textarea--${props.size}`]
  if (props.error) classes.push('wb-textarea--error')
  if (props.disabled) classes.push('wb-textarea--disabled')
  if (props.readonly) classes.push('wb-textarea--readonly')
  return classes
})

const containerStyles = computed(() => ({
  borderRadius: borderRadiusValue.value,
  borderColor: props.error ? '#ef4444' : (isFocused.value ? colorValue.value : '#d1d5db'),
  padding: sizeConfig.value.padding,
  fontSize: sizeConfig.value.fontSize
}))

const textareaStyles = computed(() => ({
  resize: props.resize
}))

const adjustHeight = (): void => {
  if (props.autoGrow && textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
  }
}

const handleInput = (event: Event): void => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', event)

  if (props.autoGrow) {
    nextTick(() => adjustHeight())
  }
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

const handleKeydown = (event: KeyboardEvent): void => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent): void => {
  emit('keyup', event)
}

const handleKeypress = (event: KeyboardEvent): void => {
  emit('keypress', event)
}

watch(() => props.modelValue, () => {
  if (props.autoGrow) {
    nextTick(() => adjustHeight())
  }
}, { immediate: true })

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  select: () => textareaRef.value?.select()
})
</script>

<style scoped>
.wb-textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
}

.wb-textarea-wrapper--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wb-textarea-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: block;
}

.wb-textarea-required {
  color: #ef4444;
  margin-left: 0.125rem;
}

.wb-textarea-container {
  display: flex;
  background-color: #ffffff;
  border: 2px solid;
  transition: all 0.2s ease;
  position: relative;
}

.wb-textarea-container:hover:not(.wb-textarea-wrapper--disabled .wb-textarea-container) {
  border-color: #9ca3af;
}

.wb-textarea {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: system-ui, -apple-system, sans-serif;
  color: #1f2937;
  padding: 0;
  line-height: 1.5;
  min-height: 3rem;
}

.wb-textarea::placeholder {
  color: #9ca3af;
}

.wb-textarea--disabled {
  cursor: not-allowed;
}

.wb-textarea--readonly {
  cursor: default;
}

.wb-textarea-message {
  font-size: 0.75rem;
  color: #6b7280;
}

.wb-textarea-message--error {
  color: #ef4444;
}
</style>
