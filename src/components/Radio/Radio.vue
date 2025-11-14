<template>
  <label class="wb-radio" :class="radioClasses">
    <input
      :id="radioId"
      ref="radioRef"
      type="radio"
      class="wb-radio__input"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      :required="required"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span class="wb-radio__box" :style="radioStyles">
      <span v-if="isChecked" class="wb-radio__dot" :style="dotStyles" />
    </span>
    <span v-if="label || $slots.default" class="wb-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RadioProps, RadioEmits } from '@/types'
import { useComponentStyles } from '@/composables/useComponentStyles'

defineOptions({
  name: 'wb-radio'
})

const props = withDefaults(defineProps<RadioProps>(), {
  size: 'md',
  color: 'primary',
  required: false
})

const emit = defineEmits<RadioEmits>()

const radioRef = ref<HTMLInputElement | null>(null)

const { colorValue } = useComponentStyles({
  color: props.color,
  customColor: props.customColor,
  size: props.size
})

const radioId = computed(() => props.id || `wb-radio-${Math.random().toString(36).substring(2, 9)}`)

const isChecked = computed(() => props.modelValue === props.value)

const radioSize = computed(() => {
  const sizeMap: Record<string, string> = {
    xs: '14px',
    sm: '16px',
    md: '18px',
    lg: '20px',
    xl: '22px'
  }
  return sizeMap[props.size || 'md']
})

const radioClasses = computed(() => {
  const classes: string[] = [`wb-radio--${props.size}`]
  if (props.disabled) classes.push('wb-radio--disabled')
  if (isChecked.value) classes.push('wb-radio--checked')
  if (props.class) classes.push(props.class)
  return classes
})

const radioStyles = computed(() => ({
  borderColor: isChecked.value ? colorValue.value : '#d1d5db',
  width: radioSize.value,
  height: radioSize.value
}))

const dotStyles = computed(() => ({
  backgroundColor: colorValue.value
}))

const handleChange = (event: Event): void => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
    emit('change', event)
  }
}

const handleFocus = (event: FocusEvent): void => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent): void => {
  emit('blur', event)
}

defineExpose({
  focus: () => radioRef.value?.focus(),
  blur: () => radioRef.value?.blur()
})
</script>

<style scoped>
.wb-radio {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  font-family: system-ui, -apple-system, sans-serif;
  position: relative;
}

.wb-radio--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.wb-radio__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.wb-radio__box {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.wb-radio:hover:not(.wb-radio--disabled) .wb-radio__box {
  border-color: #9ca3af;
}

.wb-radio__input:focus + .wb-radio__box {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.wb-radio__dot {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.wb-radio__label {
  font-size: 0.875rem;
  color: #374151;
}

.wb-radio--disabled .wb-radio__label {
  color: #9ca3af;
}

.wb-radio--xs .wb-radio__label {
  font-size: 0.75rem;
}

.wb-radio--sm .wb-radio__label {
  font-size: 0.8125rem;
}

.wb-radio--md .wb-radio__label {
  font-size: 0.875rem;
}

.wb-radio--lg .wb-radio__label {
  font-size: 1rem;
}

.wb-radio--xl .wb-radio__label {
  font-size: 1.125rem;
}
</style>
