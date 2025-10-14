<template>
  <button
    class="alert__close"
    :style="{ color }"
    @click="emit('close')"
  >
    ✕
  </button>
</template>

<script setup lang="ts">
defineProps<{
  color: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
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