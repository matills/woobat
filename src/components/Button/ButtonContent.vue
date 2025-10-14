<template>
  <span 
    :class="['wb-btn__content', contentClass, { 'wb-btn__content--hidden': !visible }]"
    :style="contentStyle"
  >
    <ButtonIcon v-if="iconLeft && !iconOnly" :icon="iconLeft" position="left" />
    
    <span v-if="!iconOnly" class="wb-btn__text">
      <slot />
    </span>
    
    <ButtonIcon v-if="iconRight && !iconOnly" :icon="iconRight" position="right" />
    
    <ButtonIcon v-if="iconOnly && (iconLeft || iconRight)" :icon="(iconLeft || iconRight)!" />
  </span>
</template>

<script setup lang="ts">
import type { Component, CSSProperties } from 'vue'
import ButtonIcon from './ButtonIcon.vue'

defineProps<{
  visible: boolean
  iconLeft?: Component | string
  iconRight?: Component | string
  iconOnly?: boolean
  contentClass?: string
  contentStyle?: CSSProperties | string
}>()
</script>

<style scoped>
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

.wb-btn__text {
  white-space: nowrap;
}
</style>