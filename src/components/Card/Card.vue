<template>
  <div :class="cardClasses" :style="cardStyles" @click="handleClick">
    <div v-if="$slots.header" class="wb-card__header">
      <slot name="header" />
    </div>

    <div class="wb-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="wb-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps, CardEmits } from '@/types'
import { BORDER_RADIUS, ELEVATION } from '@/constants'

defineOptions({
  name: 'wb-card'
})

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'elevated',
  rounded: 'lg',
  elevation: 1,
  padding: '1.5rem',
  hoverable: false,
  clickable: false
})

const emit = defineEmits<CardEmits>()

const cardClasses = computed(() => {
  const classes = ['wb-card', `wb-card--${props.variant}`]
  if (props.hoverable) classes.push('wb-card--hoverable')
  if (props.clickable) classes.push('wb-card--clickable')
  if (props.disabled) classes.push('wb-card--disabled')
  if (props.class) classes.push(props.class)
  return classes
})

const cardStyles = computed(() => {
  const styles: Record<string, any> = {
    borderRadius: BORDER_RADIUS[props.rounded || 'lg'],
    padding: props.padding
  }

  if (props.variant === 'elevated') {
    styles.boxShadow = ELEVATION[props.elevation || 1]
    styles.backgroundColor = '#ffffff'
  } else if (props.variant === 'outlined') {
    styles.border = '1px solid #e5e7eb'
    styles.backgroundColor = '#ffffff'
  } else if (props.variant === 'filled') {
    styles.backgroundColor = '#f9fafb'
  }

  if (props.style) {
    Object.assign(styles, props.style)
  }

  return styles
})

const handleClick = (event: MouseEvent): void => {
  if (!props.disabled && (props.clickable || props.hoverable)) {
    emit('click', event)
  }
}
</script>

<style scoped>
.wb-card {
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, sans-serif;
  transition: all 0.2s ease;
  overflow: hidden;
}

.wb-card--clickable {
  cursor: pointer;
}

.wb-card--hoverable:hover:not(.wb-card--disabled),
.wb-card--clickable:hover:not(.wb-card--disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.wb-card--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wb-card__header {
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
  margin-left: calc(var(--card-padding, 1.5rem) * -1);
  margin-right: calc(var(--card-padding, 1.5rem) * -1);
  margin-top: calc(var(--card-padding, 1.5rem) * -1);
  padding-left: var(--card-padding, 1.5rem);
  padding-right: var(--card-padding, 1.5rem);
  padding-top: var(--card-padding, 1.5rem);
}

.wb-card__body {
  flex: 1;
}

.wb-card__footer {
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
  margin-left: calc(var(--card-padding, 1.5rem) * -1);
  margin-right: calc(var(--card-padding, 1.5rem) * -1);
  margin-bottom: calc(var(--card-padding, 1.5rem) * -1);
  padding-left: var(--card-padding, 1.5rem);
  padding-right: var(--card-padding, 1.5rem);
  padding-bottom: var(--card-padding, 1.5rem);
}
</style>
