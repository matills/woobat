<template>
  <div class="alert__icon">
    <component v-if="customIcon" :is="customIcon" />
    <component v-else-if="type !== 'custom'" :is="ALERT_TYPE_ICONS[type]" />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import type { AlertType } from '@/types'
import { ALERT_TYPE_ICONS } from '@/constants'

defineProps<{
  type: AlertType
  customIcon?: Component
}>()
</script>

<style scoped>
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
</style>