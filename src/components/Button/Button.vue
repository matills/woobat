<template>
  <component
    :is="componentTag"
    ref="rippleRef"
    :class="buttonClasses"
    :style="buttonStyles"
    :type="componentTag === 'button' ? type : undefined"
    :href="componentTag === 'a' ? href : undefined"
    :target="componentTag === 'a' ? target : undefined"
    :to="isRouterLink ? to : undefined"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <div v-if="loading" class="wb-btn__loading-overlay">
      <div class="wb-btn__spinner">
        <LoadingIcon />
      </div>
      <span v-if="showLoadingText" class="wb-btn__loading-text">
        {{ loadingText || 'Loading...' }}
      </span>
    </div>

    <span 
      :class="['wb-btn__content', contentClass, { 'wb-btn__content--hidden': loading && !preserveText }]"
      :style="mergedContentStyle"
    >
      <span v-if="iconLeft && !iconOnly" class="wb-btn__icon wb-btn__icon--left">
        <component v-if="isComponent(iconLeft)" :is="iconLeft" />
        <i v-else :class="iconLeft" />
      </span>

      <span v-if="!iconOnly" class="wb-btn__text">
        <slot />
      </span>

      <span v-if="iconRight && !iconOnly" class="wb-btn__icon wb-btn__icon--right">
        <component v-if="isComponent(iconRight)" :is="iconRight" />
        <i v-else :class="iconRight" />
      </span>

      <span v-if="iconOnly && (iconLeft || iconRight)" class="wb-btn__icon">
        <component v-if="isComponent(iconLeft || iconRight)" :is="(iconLeft || iconRight) as Component" />
        <i v-else :class="(iconLeft || iconRight) as string" />
      </span>
    </span>

    <div v-if="clickZones && clickZones.length" class="wb-btn__zones">
      <div
        v-for="(zone, index) in clickZones"
        :key="index"
        :class="`wb-btn__zone wb-btn__zone--${zone.area}`"
        @click.stop="handleZoneClick(zone, $event)"
      />
    </div>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Component } from 'vue'
import type { ButtonProps, ButtonEmits } from '@/types'
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_ROUNDED, BUTTON_ELEVATION } from '@/constants'
import { addOpacity, parsePadding, mergeStyles } from '@/utils'
import { useRipple } from '@/composables'
import { LoadingIcon } from './icons'

defineOptions({
  name: 'wb-button'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  rounded: 'md',
  elevation: 0,
  ripple: true,
  tag: 'button',
  type: 'button',
  clickAnimation: 'scale',
  animationDuration: 150
})

const emit = defineEmits<ButtonEmits>()

const isAnimating = ref(false)

const { rippleRef, setEnabled } = useRipple({
  color: 'rgba(255, 255, 255, 0.5)',
  duration: 600,
  opacity: 0.3
})

watch(() => props.ripple, (newVal) => {
  setEnabled(newVal)
}, { immediate: true })

watch(() => props.disabled, (newVal) => {
  if (newVal) setEnabled(false)
  else if (props.ripple) setEnabled(true)
})

const componentTag = computed(() => {
  if (props.tag === 'a' && props.href) return 'a'
  if ((props.tag === 'router-link' || props.tag === 'nuxt-link') && props.to) return props.tag
  return 'button'
})

const isRouterLink = computed(() => {
  return componentTag.value === 'router-link' || componentTag.value === 'nuxt-link'
})

const isDisabled = computed(() => {
  return props.disabled || props.loading
})

const baseColor = computed(() => {
  if (props.customColor) return props.customColor
  if (props.color === 'custom') return BUTTON_COLORS.primary
  return BUTTON_COLORS[props.color]
})

const finalTextColor = computed(() => {
  if (props.textColor) return props.textColor
  if (props.variant === 'filled' || props.variant === 'elevated') return '#ffffff'
  return baseColor.value
})

const buttonClasses = computed(() => {
  const classes = ['wb-btn', `wb-btn--${props.variant}`, `wb-btn--${props.size}`]
  
  if (props.block) classes.push('wb-btn--block')
  if (props.iconOnly) classes.push('wb-btn--icon-only')
  if (isDisabled.value) classes.push('wb-btn--disabled')
  if (props.loading) classes.push('wb-btn--loading')
  if (props.clickAnimation !== 'none') classes.push(`wb-btn--animation-${props.clickAnimation}`)
  if (isAnimating.value) classes.push('wb-btn--animating')
  if (props.class) classes.push(props.class)
  
  return classes
})

const buttonStyles = computed(() => {
  const sizeConfig = BUTTON_SIZES[props.size]
  const styles: Record<string, any> = {
    borderRadius: BUTTON_ROUNDED[props.rounded],
    boxShadow: BUTTON_ELEVATION[props.elevation]
  }
  
  if (props.noPadding || props.padding === 'none') {
    styles.padding = '0'
  } else if (props.padding) {
    styles.padding = parsePadding(props.padding)
  } else if (!props.iconOnly) {
    styles.padding = sizeConfig.padding
  }
  
  if (!props.iconOnly) {
    styles.fontSize = sizeConfig.fontSize
    styles.height = sizeConfig.height
  } else {
    const size = sizeConfig.height
    styles.width = size
    styles.height = size
  }
  
  if (props.variant === 'filled') {
    styles.backgroundColor = baseColor.value
    styles.color = finalTextColor.value
  } else if (props.variant === 'outlined') {
    styles.backgroundColor = 'transparent'
    styles.color = finalTextColor.value
    styles.border = `1px solid ${props.borderColor || baseColor.value}`
  } else if (props.variant === 'text') {
    styles.backgroundColor = 'transparent'
    styles.color = finalTextColor.value
  } else if (props.variant === 'elevated') {
    styles.backgroundColor = baseColor.value
    styles.color = finalTextColor.value
    styles.boxShadow = BUTTON_ELEVATION[3]
  } else if (props.variant === 'tonal') {
    styles.backgroundColor = addOpacity(baseColor.value, 0.12)
    styles.color = baseColor.value
  }
  
  return mergeStyles(styles, props.style)
})

const mergedContentStyle = computed(() => {
  if (props.contentStyle) {
    return typeof props.contentStyle === 'string' 
      ? props.contentStyle 
      : props.contentStyle
  }
  return {}
})

const isComponent = (icon: Component | string | undefined): icon is Component => {
  return typeof icon === 'object' || typeof icon === 'function'
}

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) return
  
  if (props.clickAnimation !== 'none') {
    triggerAnimation()
  }
  
  if (!props.clickZones?.length) {
    emit('click', event)
  } else if (props.detectQuadrant) {
    const zone = detectClickZone(event)
    emit('zone-click', zone, event)
  }
}

const handleZoneClick = (zone: ClickZone, event: MouseEvent) => {
  zone.action()
  emit('zone-click', zone.area, event)
}

const triggerAnimation = () => {
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, props.animationDuration)
}

const detectClickZone = (event: MouseEvent): string => {
  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  if (x < centerX && y < centerY) return 'top-left'
  if (x >= centerX && y < centerY) return 'top-right'
  if (x < centerX && y >= centerY) return 'bottom-left'
  return 'bottom-right'
}

defineExpose({
  focus: () => rippleRef.value?.focus(),
  blur: () => rippleRef.value?.blur()
})
</script>

<style scoped>
.wb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 500;
  line-height: 1;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  user-select: none;
  text-decoration: none;
}

.wb-btn--block {
  display: flex;
  width: 100%;
}

.wb-btn--icon-only {
  padding: 0;
  aspect-ratio: 1;
}

.wb-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.wb-btn:hover:not(.wb-btn--disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.wb-btn:active:not(.wb-btn--disabled) {
  transform: translateY(0);
}

.wb-btn--outlined:hover:not(.wb-btn--disabled),
.wb-btn--text:hover:not(.wb-btn--disabled) {
  background-color: rgba(0, 0, 0, 0.04);
}

.wb-btn__content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  transition: opacity 0.2s ease;
}

.wb-btn__content--hidden {
  opacity: 0;
}

.wb-btn__loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 2;
}

.wb-btn__spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wb-btn__spinner :deep(svg) {
  width: 1.25em;
  height: 1.25em;
}

.wb-btn__loading-text {
  font-size: 0.875em;
}

.wb-btn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wb-btn__icon :deep(svg) {
  width: 1.25em;
  height: 1.25em;
}

.wb-btn__text {
  white-space: nowrap;
}

.wb-btn__zones {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.wb-btn__zone {
  cursor: pointer;
}

.wb-btn__zone--top-left {
  grid-column: 1;
  grid-row: 1;
}

.wb-btn__zone--top-right {
  grid-column: 2;
  grid-row: 1;
}

.wb-btn__zone--bottom-left {
  grid-column: 1;
  grid-row: 2;
}

.wb-btn__zone--bottom-right {
  grid-column: 2;
  grid-row: 2;
}

.wb-btn__zone--center {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.wb-btn--animation-scale.wb-btn--animating {
  animation: scale-animation 0.15s ease;
}

.wb-btn--animation-shake.wb-btn--animating {
  animation: shake-animation 0.3s ease;
}

.wb-btn--animation-pulse.wb-btn--animating {
  animation: pulse-animation 0.3s ease;
}

.wb-btn--animation-bounce.wb-btn--animating {
  animation: bounce-animation 0.3s ease;
}

@keyframes scale-animation {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.95); }
}

@keyframes shake-animation {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes pulse-animation {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes bounce-animation {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>