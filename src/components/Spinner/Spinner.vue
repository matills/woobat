<template>
  <div :class="spinnerWrapperClasses" :style="wrapperStyles">
    <div v-if="variant === 'circular'" class="wb-spinner wb-spinner--circular" :style="spinnerStyles">
      <svg :width="spinnerSize" :height="spinnerSize" :viewBox="`0 0 ${spinnerSize} ${spinnerSize}`">
        <circle
          class="wb-spinner__track"
          :cx="spinnerSize / 2"
          :cy="spinnerSize / 2"
          :r="radius"
          :style="trackStyles"
        />
        <circle
          class="wb-spinner__bar"
          :cx="spinnerSize / 2"
          :cy="spinnerSize / 2"
          :r="radius"
          :style="barStyles"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference * 0.25"
        />
      </svg>
    </div>

    <div v-else-if="variant === 'dots'" class="wb-spinner wb-spinner--dots" :style="spinnerStyles">
      <span class="wb-spinner__dot" :style="dotStyles" />
      <span class="wb-spinner__dot" :style="dotStyles" />
      <span class="wb-spinner__dot" :style="dotStyles" />
    </div>

    <div v-else-if="variant === 'bars'" class="wb-spinner wb-spinner--bars" :style="spinnerStyles">
      <span class="wb-spinner__bar-item" :style="barItemStyles" />
      <span class="wb-spinner__bar-item" :style="barItemStyles" />
      <span class="wb-spinner__bar-item" :style="barItemStyles" />
      <span class="wb-spinner__bar-item" :style="barItemStyles" />
    </div>

    <div v-else-if="variant === 'pulse'" class="wb-spinner wb-spinner--pulse" :style="pulseStyles" />

    <span v-if="label || $slots.default" class="wb-spinner__label">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SpinnerProps } from '@/types'
import { useComponentStyles } from '@/composables/useComponentStyles'

defineOptions({
  name: 'wb-spinner'
})

const props = withDefaults(defineProps<SpinnerProps>(), {
  variant: 'circular',
  color: 'primary',
  size: 'md',
  speed: 'normal',
  labelPosition: 'bottom'
})

const { colorValue } = useComponentStyles({
  color: props.color,
  customColor: props.customColor
})

const spinnerSize = computed(() => {
  if (typeof props.size === 'number') return props.size

  const sizeMap: Record<string, number> = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64
  }
  return sizeMap[props.size || 'md']
})

const animationDuration = computed(() => {
  const speedMap: Record<string, string> = {
    slow: '1.5s',
    normal: '1s',
    fast: '0.6s'
  }
  return speedMap[props.speed || 'normal']
})

const strokeWidth = computed(() => Math.max(2, spinnerSize.value / 10))
const radius = computed(() => (spinnerSize.value - strokeWidth.value) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

const spinnerWrapperClasses = computed(() => {
  const classes = ['wb-spinner-wrapper', `wb-spinner-wrapper--${props.labelPosition}`]
  if (props.class) classes.push(props.class)
  return classes
})

const wrapperStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.style) Object.assign(styles, props.style)
  return styles
})

const spinnerStyles = computed(() => ({
  width: `${spinnerSize.value}px`,
  height: `${spinnerSize.value}px`,
  animationDuration: animationDuration.value
}))

const trackStyles = computed(() => ({
  fill: 'none',
  stroke: '#e5e7eb',
  strokeWidth: `${strokeWidth.value}px`
}))

const barStyles = computed(() => ({
  fill: 'none',
  stroke: colorValue.value,
  strokeWidth: `${strokeWidth.value}px`,
  strokeLinecap: 'round'
}))

const dotStyles = computed(() => ({
  backgroundColor: colorValue.value,
  width: `${spinnerSize.value / 4}px`,
  height: `${spinnerSize.value / 4}px`,
  animationDuration: animationDuration.value
}))

const barItemStyles = computed(() => ({
  backgroundColor: colorValue.value,
  width: `${spinnerSize.value / 8}px`,
  animationDuration: animationDuration.value
}))

const pulseStyles = computed(() => ({
  backgroundColor: colorValue.value,
  width: `${spinnerSize.value}px`,
  height: `${spinnerSize.value}px`,
  animationDuration: animationDuration.value
}))
</script>

<style scoped>
.wb-spinner-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.wb-spinner-wrapper--top {
  flex-direction: column-reverse;
}

.wb-spinner-wrapper--bottom {
  flex-direction: column;
}

.wb-spinner-wrapper--left {
  flex-direction: row-reverse;
}

.wb-spinner-wrapper--right {
  flex-direction: row;
}

.wb-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Circular Spinner */
.wb-spinner--circular svg {
  animation: spin linear infinite;
}

.wb-spinner--circular .wb-spinner__bar {
  transform-origin: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Dots Spinner */
.wb-spinner--dots {
  gap: 0.25rem;
}

.wb-spinner__dot {
  border-radius: 50%;
  animation: dots ease-in-out infinite;
}

.wb-spinner__dot:nth-child(1) {
  animation-delay: 0s;
}

.wb-spinner__dot:nth-child(2) {
  animation-delay: 0.15s;
}

.wb-spinner__dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes dots {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Bars Spinner */
.wb-spinner--bars {
  gap: 0.125rem;
  align-items: center;
}

.wb-spinner__bar-item {
  height: 100%;
  animation: bars ease-in-out infinite;
  border-radius: 2px;
}

.wb-spinner__bar-item:nth-child(1) {
  animation-delay: 0s;
}

.wb-spinner__bar-item:nth-child(2) {
  animation-delay: 0.1s;
}

.wb-spinner__bar-item:nth-child(3) {
  animation-delay: 0.2s;
}

.wb-spinner__bar-item:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes bars {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}

/* Pulse Spinner */
.wb-spinner--pulse {
  border-radius: 50%;
  animation: pulse ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(0);
  }
  50% {
    opacity: 0.5;
    transform: scale(1);
  }
}

.wb-spinner__label {
  font-size: 0.875rem;
  color: #6b7280;
  font-family: system-ui, -apple-system, sans-serif;
}
</style>
