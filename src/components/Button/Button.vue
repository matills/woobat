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
    <ButtonLoading
      v-if="loading"
      :show-text="showLoadingText"
      :text="loadingText"
    />

    <ButtonContent
      :visible="!loading || preserveText"
      :icon-left="iconLeft"
      :icon-right="iconRight"
      :icon-only="iconOnly"
      :content-class="contentClass"
      :content-style="mergedContentStyle"
    >
      <slot />
    </ButtonContent>

    <ButtonZones
      v-if="clickZones?.length"
      :zones="clickZones"
      @zone-click="handleZoneClick"
    />
  </component>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { ButtonProps, ButtonEmits } from '@/types'
import { useButtonAnimation } from '@/composables/button/useButtonAnimation'
import { useButtonStyles } from '@/composables/button/useButtonStyles'
import { useButtonComponent } from '@/composables/button/useButtonComponent'
import { useRipple } from '@/composables'
import ButtonLoading from '@/components/Button/ButtonLoading.vue'
import ButtonContent from '@/components/Button/ButtonContent.vue'
import ButtonZones from '@/components/Button/ButtonZones.vue'

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

const { isAnimating, triggerAnimation } = useButtonAnimation(props)
const { buttonStyles, mergedContentStyle } = useButtonStyles(props)
const { componentTag, isRouterLink, isDisabled } = useButtonComponent(props)

const { rippleRef, setEnabled } = useRipple({
  color: 'rgba(255, 255, 255, 0.5)',
  duration: 600,
  opacity: 0.3
})

watch(() => props.ripple, setEnabled, { immediate: true })
watch(() => props.disabled, (disabled) => {
  setEnabled(!disabled && props.ripple)
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

const handleClick = (event: MouseEvent): void => {
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

const handleZoneClick = (zone: string, event: MouseEvent): void => {
  emit('zone-click', zone, event)
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
</style>