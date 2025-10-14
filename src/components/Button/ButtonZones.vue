<template>
  <div class="wb-btn__zones">
    <div
      v-for="(zone, index) in zones"
      :key="index"
      :class="`wb-btn__zone wb-btn__zone--${zone.area}`"
      @click.stop="handleZoneClick(zone, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ClickZone } from '@/types'

defineProps<{
  zones: ClickZone[]
}>()

const emit = defineEmits<{
  (e: 'zone-click', zone: string, event: MouseEvent): void
}>()

const handleZoneClick = (zone: ClickZone, event: MouseEvent): void => {
  zone.action()
  emit('zone-click', zone.area, event)
}
</script>

<style scoped>
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
</style>