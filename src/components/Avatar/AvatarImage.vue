<template>
  <img
    :src="src"
    :alt="alt"
    class="wb-avatar__image"
    @error="emit('error', $event)"
    @load="emit('load', $event)"
  />
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()

const emit = defineEmits<{
  (e: 'error', event: Event): void
  (e: 'load', event: Event): void
}>()
</script>

<style scoped>
.wb-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
</style>