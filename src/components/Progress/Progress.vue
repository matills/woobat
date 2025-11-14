<template>
  <div v-if="variant === 'linear'" :class="progressClasses" :style="progressStyles">
    <div class="wb-progress__bar" :style="barStyles">
      <span v-if="showLabel" class="wb-progress__label">{{ percentage }}%</span>
    </div>
  </div>

  <div v-else-if="variant === 'circular'" class="wb-progress-circular" :class="circularClasses" :style="circularContainerStyles">
    <svg :width="circularSize" :height="circularSize" :viewBox="`0 0 ${circularSize} ${circularSize}`">
      <circle
        class="wb-progress-circular__track"
        :cx="circularSize / 2"
        :cy="circularSize / 2"
        :r="radius"
        :style="trackStyles"
      />
      <circle
        class="wb-progress-circular__bar"
        :cx="circularSize / 2"
        :cy="circularSize / 2"
        :r="radius"
        :style="circularBarStyles"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <div v-if="showLabel" class="wb-progress-circular__label" :style="labelStyles">
      {{ percentage }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressProps } from '@/types'
import { useComponentStyles } from '@/composables/useComponentStyles'
import { BORDER_RADIUS } from '@/constants'

defineOptions({
  name: 'wb-progress'
})

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  max: 100,
  variant: 'linear',
  color: 'primary',
  size: 'md',
  rounded: 'full',
  height: '8px',
  showLabel: false,
  indeterminate: false,
  striped: false,
  animated: false
})

const { colorValue } = useComponentStyles({
  color: props.color,
  customColor: props.customColor,
  size: props.size,
  rounded: props.rounded
})

const percentage = computed(() => {
  const percent = (props.value / props.max) * 100
  return Math.min(Math.max(percent, 0), 100).toFixed(0)
})

const progressClasses = computed(() => {
  const classes = ['wb-progress', `wb-progress--${props.size}`]
  if (props.indeterminate) classes.push('wb-progress--indeterminate')
  if (props.striped) classes.push('wb-progress--striped')
  if (props.animated) classes.push('wb-progress--animated')
  if (props.class) classes.push(props.class)
  return classes
})

const progressStyles = computed(() => ({
  height: props.height,
  borderRadius: BORDER_RADIUS[props.rounded || 'full'],
  backgroundColor: '#e5e7eb'
}))

const barStyles = computed(() => ({
  width: props.indeterminate ? '40%' : `${percentage.value}%`,
  backgroundColor: colorValue.value,
  borderRadius: BORDER_RADIUS[props.rounded || 'full']
}))

// Circular progress
const circularSize = computed(() => {
  const sizeMap: Record<string, number> = {
    xs: 40,
    sm: 60,
    md: 80,
    lg: 100,
    xl: 120
  }
  return sizeMap[props.size || 'md']
})

const strokeWidth = computed(() => {
  const widthMap: Record<string, number> = {
    xs: 3,
    sm: 4,
    md: 5,
    lg: 6,
    xl: 7
  }
  return widthMap[props.size || 'md']
})

const radius = computed(() => (circularSize.value - strokeWidth.value) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => {
  if (props.indeterminate) return circumference.value * 0.75
  return circumference.value * (1 - parseFloat(percentage.value) / 100)
})

const circularClasses = computed(() => {
  const classes: string[] = []
  if (props.indeterminate) classes.push('wb-progress-circular--indeterminate')
  if (props.class) classes.push(props.class)
  return classes
})

const circularContainerStyles = computed(() => ({
  width: `${circularSize.value}px`,
  height: `${circularSize.value}px`
}))

const trackStyles = computed(() => ({
  fill: 'none',
  stroke: '#e5e7eb',
  strokeWidth: `${strokeWidth.value}px`
}))

const circularBarStyles = computed(() => ({
  fill: 'none',
  stroke: colorValue.value,
  strokeWidth: `${strokeWidth.value}px`,
  strokeLinecap: 'round',
  transition: 'stroke-dashoffset 0.3s ease'
}))

const labelStyles = computed(() => ({
  fontSize: `${circularSize.value / 5}px`
}))
</script>

<style scoped>
.wb-progress {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.wb-progress__bar {
  height: 100%;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.wb-progress__label {
  font-size: 0.625rem;
  font-weight: 600;
  color: #ffffff;
  z-index: 1;
}

.wb-progress--indeterminate .wb-progress__bar {
  animation: indeterminate 1.5s ease-in-out infinite;
}

.wb-progress--striped .wb-progress__bar {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.wb-progress--animated .wb-progress__bar {
  animation: progress-stripes 1s linear infinite;
}

@keyframes indeterminate {
  0% {
    left: -40%;
  }
  100% {
    left: 100%;
  }
}

@keyframes progress-stripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}

/* Circular Progress */
.wb-progress-circular {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.wb-progress-circular svg {
  transform: rotate(-90deg);
}

.wb-progress-circular__bar {
  transition: stroke-dashoffset 0.3s ease;
}

.wb-progress-circular--indeterminate svg {
  animation: circular-rotate 2s linear infinite;
}

.wb-progress-circular__label {
  position: absolute;
  font-weight: 600;
  color: #374151;
}

@keyframes circular-rotate {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
</style>
