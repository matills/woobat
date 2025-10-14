<template>
  <div class="wb-avatar__content">
    <component v-if="isComponent(icon)" :is="icon" />
    <i v-else-if="icon" :class="icon" />
    <span v-else-if="displayText" class="wb-avatar__text">
      {{ displayText }}
    </span>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { getInitials } from '@/utils/avatar'

const props = defineProps<{
  icon?: Component | string
  text?: string
}>()

const isComponent = (icon: Component | string | undefined): icon is Component => {
  return typeof icon === 'object' || typeof icon === 'function'
}

const displayText = computed(() => {
  if (!props.text) return ''
  return getInitials(props.text)
})
</script>

<style scoped>
.wb-avatar__content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  text-transform: uppercase;
}

.wb-avatar__content :deep(svg) {
  width: 60%;
  height: 60%;
}

.wb-avatar__text {
  user-select: none;
}
</style>