<template>
  <span :class="wrapperClasses" :style="wrapperStyle">
    <slot />
    <span
      v-if="shouldShowBadge"
      :class="badgeClasses"
      :style="badgeStyles"
      @click="handleClick"
    >
      <component v-if="icon" :is="icon" class="wb-badge__icon" />
      <span v-else-if="!isDot" class="wb-badge__content">{{ displayContent }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps, BadgeEmits } from '@/types'
import { BADGE_COLORS } from '@/constants'

defineOptions({
  name: 'wb-badge'
})

const props = withDefaults(defineProps<BadgeProps>(), {
  position: 'top',
  align: 'end',
  color: 'error',
  format: 'default',
  overlap: false,
  showZero: false,
  bordered: false,
  pulse: false,
  inline: false
})

const emit = defineEmits<BadgeEmits>()

const isDot = computed(() => {
  return props.dot || props.format === 'dot'
})

const shouldShowBadge = computed(() => {
  if (isDot.value) return true
  if (props.icon) return true
  if (props.content === undefined || props.content === null) return false
  if (props.content === 0 || props.content === '0') return props.showZero
  return true
})

const displayContent = computed(() => {
  if (isDot.value || props.icon) return ''
  
  const content = props.content
  if (content === undefined || content === null) return ''
  
  const numContent = typeof content === 'number' ? content : parseInt(content.toString(), 10)
  
  if (!isNaN(numContent) && props.max && numContent > props.max) {
    return `${props.max}+`
  }
  
  return content.toString()
})

const baseColor = computed(() => {
  if (props.customColor) return props.customColor
  if (props.color === 'custom') return BADGE_COLORS.error
  return BADGE_COLORS[props.color]
})

const finalTextColor = computed(() => {
  return props.textColor || '#ffffff'
})

const wrapperClasses = computed(() => {
  const classes = ['wb-badge-wrapper']
  if (props.inline) classes.push('wb-badge-wrapper--inline')
  if (props.class) classes.push(props.class)
  return classes
})

const wrapperStyle = computed(() => {
  return props.style
})

const badgeClasses = computed(() => {
  const classes = ['wb-badge']
  
  classes.push(`wb-badge--${props.position}`)
  classes.push(`wb-badge--${props.align}`)
  
  if (props.overlap) classes.push('wb-badge--overlap')
  if (isDot.value) classes.push('wb-badge--dot')
  if (props.bordered) classes.push('wb-badge--bordered')
  if (props.pulse) classes.push('wb-badge--pulse')
  if (props.icon) classes.push('wb-badge--icon')
  
  return classes
})

const badgeStyles = computed(() => {
  const styles: Record<string, any> = {
    backgroundColor: baseColor.value,
    color: finalTextColor.value
  }
  
  if (props.bordered) {
    styles.border = `2px solid ${props.borderColor || '#ffffff'}`
  }
  
  return styles
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.wb-badge-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  flex-shrink: 0;
}

.wb-badge-wrapper--inline {
  display: inline-flex;
}

.wb-badge {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border-radius: 9999px;
  z-index: 1;
  box-sizing: border-box;
}

.wb-badge:not(.wb-badge--dot):not(.wb-badge--icon) {
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.375rem;
}

.wb-badge--dot {
  min-width: 0.5rem;
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
}

.wb-badge--icon {
  min-width: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0.125rem;
}

.wb-badge--bordered {
  box-shadow: 0 0 0 2px var(--border-color, #ffffff);
}

.wb-badge--top {
  top: 0;
}

.wb-badge--bottom {
  bottom: 0;
}

.wb-badge--left {
  left: 0;
}

.wb-badge--right {
  right: 0;
}

.wb-badge--top.wb-badge--start,
.wb-badge--bottom.wb-badge--start {
  left: 0;
}

.wb-badge--top.wb-badge--center,
.wb-badge--bottom.wb-badge--center {
  left: 50%;
  transform: translateX(-50%);
}

.wb-badge--top.wb-badge--end,
.wb-badge--bottom.wb-badge--end {
  right: 0;
}

.wb-badge--left.wb-badge--start,
.wb-badge--right.wb-badge--start {
  top: 0;
}

.wb-badge--left.wb-badge--center,
.wb-badge--right.wb-badge--center {
  top: 50%;
  transform: translateY(-50%);
}

.wb-badge--left.wb-badge--end,
.wb-badge--right.wb-badge--end {
  bottom: 0;
}

.wb-badge--overlap.wb-badge--top {
  top: 0;
  transform: translateY(-50%);
}

.wb-badge--overlap.wb-badge--bottom {
  bottom: 0;
  transform: translateY(50%);
}

.wb-badge--overlap.wb-badge--left {
  left: 0;
  transform: translateX(-50%);
}

.wb-badge--overlap.wb-badge--right {
  right: 0;
  transform: translateX(50%);
}

.wb-badge--overlap.wb-badge--top.wb-badge--end {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

.wb-badge--overlap.wb-badge--top.wb-badge--start {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.wb-badge--overlap.wb-badge--top.wb-badge--center {
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wb-badge--overlap.wb-badge--bottom.wb-badge--end {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}

.wb-badge--overlap.wb-badge--bottom.wb-badge--start {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}

.wb-badge--overlap.wb-badge--bottom.wb-badge--center {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
}

.wb-badge--overlap.wb-badge--left.wb-badge--center {
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
}

.wb-badge--overlap.wb-badge--right.wb-badge--center {
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
}

.wb-badge--pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.wb-badge--pulse::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: inherit;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.wb-badge__content {
  position: relative;
  z-index: 1;
}

.wb-badge__icon {
  width: 0.875rem;
  height: 0.875rem;
}

.wb-badge__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>