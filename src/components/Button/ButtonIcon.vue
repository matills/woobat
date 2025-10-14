<template>
  <span :class="iconClasses">
    <component v-if="isComponent(icon)" :is="icon" />
    <i v-else :class="icon" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

const props = defineProps<{
  icon: Component | string
  position?: 'left' | 'right'
}>()

const iconClasses = computed(() => {
  const classes = ['wb-btn__icon']
  if (props.position) classes.push(`wb-btn__icon--${props.position}`)
  return classes
})

const isComponent = (icon: Component | string): icon is Component => {
  return typeof icon === 'object' || typeof icon === 'function'
}
</script>

<style scoped>
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
</style>