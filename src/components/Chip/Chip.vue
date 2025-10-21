<template>
  <div
    :class="chipClasses"
    :style="chipStyles"
    :draggable="draggable && !props.disabled"
    @click="handleClick"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <span v-if="iconLeft" class="wb-chip__icon wb-chip__icon--left">
      <component v-if="isComponent(iconLeft)" :is="iconLeft" />
      <i v-else :class="iconLeft" />
    </span>

    <span class="wb-chip__label">
      <slot>{{ label }}</slot>
    </span>

    <span v-if="iconRight && !closable" class="wb-chip__icon wb-chip__icon--right">
      <component v-if="isComponent(iconRight)" :is="iconRight" />
      <i v-else :class="iconRight" />
    </span>

    <button
      v-if="closable"
      class="wb-chip__close"
      :style="{ color: finalTextColor }"
      :draggable="false"
      @click.stop="handleClose"
      @mousedown.stop
      @touchstart.stop
    >
      <CloseIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import type { ChipProps, ChipEmits } from '@/types'
import { CHIP_SIZES, CHIP_ROUNDED, CHIP_DEFAULT_COLOR } from '@/constants'
import { addOpacity, mergeStyles } from '@/utils'
import { CloseIcon } from './icons'

defineOptions({
  name: 'wb-chip'
})

const props = withDefaults(defineProps<ChipProps>(), {
  variant: 'filled',
  size: 'md',
  color: CHIP_DEFAULT_COLOR,
  rounded: 'full',
  square: false,
  closable: false,
  draggable: false
})

const emit = defineEmits<ChipEmits>()

const sizeConfig = computed(() => CHIP_SIZES[props.size])

const finalTextColor = computed(() => {
  if (props.textColor) return props.textColor
  if (props.variant === 'filled') return '#ffffff'
  return props.color
})

const chipClasses = computed(() => {
  const classes = [
    'wb-chip',
    `wb-chip--${props.variant}`,
    `wb-chip--${props.size}`
  ]
  
  if (props.disabled) classes.push('wb-chip--disabled')
  if (props.draggable) classes.push('wb-chip--draggable')
  if (props.class) classes.push(props.class)
  
  return classes
})

const chipStyles = computed(() => {
  const styles: Record<string, any> = {
    padding: sizeConfig.value.padding,
    fontSize: sizeConfig.value.fontSize,
    height: sizeConfig.value.height,
    gap: sizeConfig.value.gap,
    borderRadius: props.square ? '0' : CHIP_ROUNDED[props.rounded]
  }

  if (props.variant === 'filled') {
    styles.backgroundColor = props.color
    styles.color = finalTextColor.value
  } else if (props.variant === 'outlined') {
    styles.backgroundColor = 'transparent'
    styles.color = finalTextColor.value
    styles.border = `1px solid ${props.borderColor || props.color}`
  } else if (props.variant === 'text') {
    styles.backgroundColor = 'transparent'
    styles.color = finalTextColor.value
  } else if (props.variant === 'tonal') {
    styles.backgroundColor = addOpacity(props.color, 0.12)
    styles.color = props.color
  }

  return mergeStyles(styles, props.style)
})

const isComponent = (icon: Component | string | undefined): icon is Component => {
  return typeof icon === 'object' || typeof icon === 'function'
}

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('click', event)
}

const handleClose = () => {
  emit('close')
}

const handleDragStart = (event: DragEvent) => {
  if (!props.draggable || props.disabled) {
    event.preventDefault()
    return
  }
  emit('dragstart', event)
}

const handleDragEnd = (event: DragEvent) => {
  if (!props.draggable || props.disabled) {
    event.preventDefault()
    return
  }
  emit('dragend', event)
}
</script>

<style scoped>
.wb-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 500;
  line-height: 1;
  border: none;
  cursor: default;
  user-select: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.wb-chip--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.wb-chip--draggable:active {
  cursor: grabbing;
}

.wb-chip__label {
  flex: 1;
}

.wb-chip__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wb-chip__icon :deep(svg) {
  width: 1em;
  height: 1em;
}

.wb-chip__close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  opacity: 0.7;
  transition: opacity 0.2s;
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  position: relative;
  z-index: 1;
}

.wb-chip__close :deep(svg) {
  width: 1em;
  height: 1em;
}

.wb-chip__close:hover {
  opacity: 1;
}
</style>