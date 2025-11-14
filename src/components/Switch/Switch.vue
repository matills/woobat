<template>
  <label class="wb-switch" :class="switchClasses">
    <span v-if="(label || $slots.default) && labelPosition === 'left'" class="wb-switch__label wb-switch__label--left">
      <slot>{{ label }}</slot>
    </span>

    <input
      :id="switchId"
      ref="switchRef"
      type="checkbox"
      class="wb-switch__input"
      :name="name"
      :checked="modelValue"
      :disabled="disabled"
      :required="required"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span class="wb-switch__track" :style="trackStyles">
      <span class="wb-switch__thumb" :style="thumbStyles" />
    </span>

    <span v-if="(label || $slots.default) && labelPosition === 'right'" class="wb-switch__label wb-switch__label--right">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SwitchProps, SwitchEmits } from '@/types'
import { useComponentStyles } from '@/composables/useComponentStyles'

defineOptions({
  name: 'wb-switch'
})

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  size: 'md',
  color: 'primary',
  required: false,
  labelPosition: 'right'
})

const emit = defineEmits<SwitchEmits>()

const switchRef = ref<HTMLInputElement | null>(null)

const { colorValue } = useComponentStyles({
  color: props.color,
  customColor: props.customColor,
  size: props.size
})

const switchId = computed(() => props.id || `wb-switch-${Math.random().toString(36).substring(2, 9)}`)

const switchSizes = computed(() => {
  const sizeMap: Record<string, { width: string; height: string; thumbSize: string }> = {
    xs: { width: '28px', height: '16px', thumbSize: '12px' },
    sm: { width: '36px', height: '20px', thumbSize: '16px' },
    md: { width: '44px', height: '24px', thumbSize: '20px' },
    lg: { width: '52px', height: '28px', thumbSize: '24px' },
    xl: { width: '60px', height: '32px', thumbSize: '28px' }
  }
  return sizeMap[props.size || 'md']
})

const switchClasses = computed(() => {
  const classes: string[] = [`wb-switch--${props.size}`]
  if (props.disabled) classes.push('wb-switch--disabled')
  if (props.modelValue) classes.push('wb-switch--checked')
  if (props.class) classes.push(props.class)
  return classes
})

const trackStyles = computed(() => ({
  width: switchSizes.value.width,
  height: switchSizes.value.height,
  backgroundColor: props.modelValue ? colorValue.value : '#d1d5db'
}))

const thumbStyles = computed(() => ({
  width: switchSizes.value.thumbSize,
  height: switchSizes.value.thumbSize,
  transform: props.modelValue
    ? `translateX(calc(${switchSizes.value.width} - ${switchSizes.value.thumbSize} - 4px))`
    : 'translateX(2px)'
}))

const handleChange = (event: Event): void => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue, event)
  }
}

const handleFocus = (event: FocusEvent): void => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent): void => {
  emit('blur', event)
}

defineExpose({
  focus: () => switchRef.value?.focus(),
  blur: () => switchRef.value?.blur()
})
</script>

<style scoped>
.wb-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  font-family: system-ui, -apple-system, sans-serif;
  position: relative;
}

.wb-switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.wb-switch__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.wb-switch__track {
  display: flex;
  align-items: center;
  border-radius: 9999px;
  transition: all 0.3s ease;
  position: relative;
  flex-shrink: 0;
}

.wb-switch:hover:not(.wb-switch--disabled) .wb-switch__track {
  opacity: 0.9;
}

.wb-switch__input:focus + .wb-switch__track {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.wb-switch__thumb {
  background-color: #ffffff;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.wb-switch__label {
  font-size: 0.875rem;
  color: #374151;
}

.wb-switch--disabled .wb-switch__label {
  color: #9ca3af;
}

.wb-switch--xs .wb-switch__label {
  font-size: 0.75rem;
}

.wb-switch--sm .wb-switch__label {
  font-size: 0.8125rem;
}

.wb-switch--md .wb-switch__label {
  font-size: 0.875rem;
}

.wb-switch--lg .wb-switch__label {
  font-size: 1rem;
}

.wb-switch--xl .wb-switch__label {
  font-size: 1.125rem;
}
</style>
