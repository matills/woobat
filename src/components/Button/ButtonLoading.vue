<template>
  <div class="wb-btn__loading-overlay">
    <div class="wb-btn__spinner">
      <LoadingIcon />
    </div>
    <span v-if="showText" class="wb-btn__loading-text">
      {{ text || 'Loading...' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { LoadingIcon } from './icons'

defineProps<{
  showText?: boolean
  text?: string
}>()
</script>

<style scoped>
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

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>