<template>
  <div
    v-if="isVisible"
    class="alert"
    :class="alertClasses"
    :style="alertStyles"
  >
    <div class="alert__content">
      <AlertIcon
        v-if="showIcon"
        :type="type"
        :custom-icon="customIcon"
      />
      <div class="alert__body" :class="{ 'alert__body--center': center }">
        <div class="alert__title">{{ finalTitle }}</div>
        <div class="alert__message">
          <slot />
        </div>
      </div>
    </div>
    <AlertClose
      v-if="closable"
      :color="finalColorText"
      @close="handleCloseClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AlertProps, AlertEmits } from '@/types'
import { ALERT_TYPE_ICONS } from '@/constants'
import { useAlert } from '@/composables/alert/useAlert'
import AlertIcon from '@/components/Alert/AlertIcon.vue'
import AlertClose from '@/components/Alert/AlertClose.vue'

defineOptions({
  name: 'wb-alert'
})

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'color',
  type: 'info',
  border: 'left',
  closable: false,
  icon: false,
  center: false
})

const emit = defineEmits<AlertEmits>()

const {
  isVisible,
  finalColorText,
  finalTitle,
  backgroundColor,
  borderStyle,
  borderPosition,
  showIcon,
  handleClose
} = useAlert(props)

const alertClasses = computed(() => {
  const classes = ['alert']
  if (props.center) classes.push('alert--center')
  return classes
})

const alertStyles = computed(() => ({
  backgroundColor: backgroundColor.value,
  color: finalColorText.value,
  padding: props.padding || '1rem',
  [borderPosition.value]: borderStyle.value
}))

const handleCloseClick = (): void => {
  handleClose()
  emit('close')
}

defineExpose({
  close: handleClose
})
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 0.5rem;
  font-family: system-ui, -apple-system, sans-serif;
  position: relative;
}

.alert--center {
  align-items: center;
}

.alert__content {
  display: flex;
  gap: 0.75rem;
  flex: 1;
  align-items: flex-start;
}

.alert__body {
  flex: 1;
}

.alert__body--center {
  text-align: center;
}

.alert__title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.alert__message {
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>