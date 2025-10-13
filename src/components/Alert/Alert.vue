<template>
  <div
    v-if="isVisible"
    class="alert"
    :class="{ 'alert--center': center }"
    :style="{
      backgroundColor: backgroundColor,
      color: finalColorText,
      padding: padding || '1rem',
      [borderPosition]: borderStyle
    }"
  >
    <div class="alert__content">
      <div v-if="showIcon" class="alert__icon">
        <component v-if="customIcon" :is="customIcon" />
        <component v-else-if="type !== 'custom'" :is="ALERT_TYPE_ICONS[type]" />
      </div>
      <div class="alert__body" :class="{ 'alert__body--center': center }">
        <div class="alert__title">{{ finalTitle }}</div>
        <div class="alert__message">
          <slot />
        </div>
      </div>
    </div>
    <button
      v-if="closable"
      class="alert__close"
      :style="{ color: finalColorText }"
      @click="handleClose"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { AlertProps, AlertEmits } from '@/types'
import { ALERT_TYPE_COLORS, ALERT_TYPE_ICONS } from '@/constants'
import { addOpacity } from '@/utils/colors'

defineOptions({
  name: 'wb-alert'
})

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'color',
  type: 'info',
  border: 'left',
  closable: false,
  icon: false,
  center: false
})

const emit = defineEmits<AlertEmits>()

const isVisible = ref(true)

const finalColor = computed(() => {
  return props.color || ALERT_TYPE_COLORS[props.type]
})

const finalColorText = computed(() => {
  if (props.colorText) return props.colorText
  return props.variant === 'color' ? '#ffffff' : finalColor.value
})

const finalTitle = computed(() => {
  if (props.title) return props.title
  return props.type.charAt(0).toUpperCase() + props.type.slice(1)
})

const backgroundColor = computed(() => {
  if (props.variant === 'color') return finalColor.value
  if (props.variant === 'outlined') return 'transparent'
  return addOpacity(finalColor.value, 0.1)
})

const borderStyle = computed(() => {
  if (props.variant === 'outlined') {
    return `1px solid ${finalColor.value}`
  }
  if (props.variant === 'border') {
    const borders = {
      top: `3px solid ${finalColor.value}`,
      right: `3px solid ${finalColor.value}`,
      bottom: `3px solid ${finalColor.value}`,
      left: `3px solid ${finalColor.value}`
    }
    return borders[props.border!]
  }
  return 'none'
})

const borderPosition = computed(() => {
  if (props.variant === 'outlined') return 'border'
  if (props.variant === 'border') return `border-${props.border}`
  return ''
})

const showIcon = computed(() => {
  return props.icon || props.customIcon
})

const handleClose = () => {
  isVisible.value = false
  emit('close')
}

defineExpose({
  close: handleClose
})
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 0.5rem;
  font-family: system-ui, -apple-system, sans-serif;
  position: relative;
}

.alert--center {
  align-items: center;
}

.alert__content {
  display: flex;
  gap: 0.75rem;
  flex: 1;
  align-items: flex-start;
}

.alert__icon {
  font-size: 1.25rem;
  font-weight: bold;
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert__icon :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.alert__body {
  flex: 1;
}

.alert__body--center {
  text-align: center;
}

.alert__title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.alert__message {
  font-size: 0.875rem;
  line-height: 1.5;
}

.alert__close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert__close:hover {
  opacity: 1;
}
</style>