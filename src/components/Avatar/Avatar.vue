<template>
  <div
    :class="avatarClasses"
    :style="avatarStyles"
    @click="handleClick"
  >
    <AvatarImage
      v-if="showImage"
      :src="src!"
      :alt="alt"
      @error="handleError"
      @load="handleLoad"
    />
    
    <AvatarContent
      v-else
      :icon="icon"
      :text="text"
    >
      <slot />
    </AvatarContent>

    <AvatarLoading v-if="loading" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AvatarProps, AvatarEmits } from '@/types'
import { useAvatar } from '@/composables/avatar/useAvatar'
import { useAvatarStyles } from '@/composables/avatar/useAvatarStyles'
import AvatarImage from './AvatarImage.vue'
import AvatarContent from './AvatarContent.vue'
import AvatarLoading from './AvatarLoading.vue'

defineOptions({
  name: 'wb-avatar'
})

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  color: 'primary',
  rounded: 'full',
  tile: false,
  loading: false,
  elevation: 0,
  bordered: false
})

const emit = defineEmits<AvatarEmits>()

const {
  baseColor,
  finalTextColor,
  avatarSize,
  fontSize,
  borderRadius,
  showImage,
  handleImageError,
  handleImageLoad
} = useAvatar(props)

const { avatarStyles } = useAvatarStyles(props, {
  baseColor: baseColor.value,
  finalTextColor: finalTextColor.value,
  avatarSize: avatarSize.value,
  fontSize: fontSize.value,
  borderRadius: borderRadius.value
})

const avatarClasses = computed(() => {
  const classes = ['wb-avatar']
  if (props.class) classes.push(props.class)
  if (props.disabled) classes.push('wb-avatar--disabled')
  return classes
})

const handleClick = (event: MouseEvent): void => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const handleError = (event: Event): void => {
  handleImageError(event)
  emit('error', event)
}

const handleLoad = (event: Event): void => {
  handleImageLoad(event)
  emit('load', event)
}
</script>

<style scoped>
.wb-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  flex-shrink: 0;
  font-family: system-ui, -apple-system, sans-serif;
  user-select: none;
  transition: all 0.2s ease;
}

.wb-avatar--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>