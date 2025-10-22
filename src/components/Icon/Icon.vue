<template>
  <span
    :class="iconClasses"
    :style="iconStyles"
    @click="handleClick"
  >
    <component v-if="isComponent(icon)" :is="icon" />
    <i v-else-if="icon" :class="icon" />
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import type { IconProps, IconEmits } from '@/types'
import { ICON_SIZES } from '@/constants'
import { mergeStyles } from '@/utils'

defineOptions({
  name: 'wb-icon'
})

const props = withDefaults(defineProps<IconProps>(), {
  rotation: 0,
  flip: 'none',
  spin: false,
  pulse: false
})

const emit = defineEmits<IconEmits>()

const isComponent = (icon: Component | string | undefined): icon is Component => {
  return typeof icon === 'object' || typeof icon === 'function'
}

const finalSize = computed(() => {
  if (!props.size) return ICON_SIZES.md
  
  if (typeof props.size === 'number') return `${props.size}px`
  
  if (typeof props.size === 'string') {
    if (props.size in ICON_SIZES) {
      return ICON_SIZES[props.size as keyof typeof ICON_SIZES]
    }
    return props.size
  }
  
  return ICON_SIZES.md
})

const iconClasses = computed(() => {
  const classes = ['wb-icon']
  
  if (props.disabled) classes.push('wb-icon--disabled')
  if (props.class) classes.push(props.class)
  
  return classes
})

const iconStyles = computed(() => {
  const styles: Record<string, any> = {
    width: finalSize.value,
    height: finalSize.value,
    fontSize: finalSize.value
  }
  
  if (props.color) {
    styles.color = props.color
  }
  
  const transforms: string[] = []
  
  if (props.rotation !== 0) {
    transforms.push(`rotate(${props.rotation}deg)`)
  }
  
  if (props.flip !== 'none') {
    if (props.flip === 'horizontal') {
      transforms.push('scaleX(-1)')
    } else if (props.flip === 'vertical') {
      transforms.push('scaleY(-1)')
    } else if (props.flip === 'both') {
      transforms.push('scale(-1)')
    }
  }
  
  if (transforms.length > 0) {
    styles.transform = transforms.join(' ')
  }
  
  const animations: string[] = []
  if (props.spin) animations.push('wb-icon-spin 1s linear infinite')
  if (props.pulse) animations.push('wb-icon-pulse 2s ease-in-out infinite')
  
  if (animations.length > 0) {
    styles.animation = animations.join(', ')
  }
  
  return mergeStyles(styles, props.style)
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('click', event)
}

defineExpose({
  element: computed(() => null)
})
</script>

<style scoped>
.wb-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  user-select: none;
  line-height: 1;
}

.wb-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
  stroke: currentColor;
}

.wb-icon :deep(i) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.wb-icon--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

@keyframes wb-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes wb-icon-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>