import { ref, computed } from 'vue'
import type { AvatarProps } from '@/types'
import { AVATAR_COLORS, AVATAR_SIZES, AVATAR_FONT_SIZES } from '@/constants'
import { parseSize, isPresetSize } from '@/utils/avatar'

export const useAvatar = (props: AvatarProps) => {
  const imageError = ref(false)
  const imageLoaded = ref(false)

  const baseColor = computed(() => {
    if (props.customColor) return props.customColor
    if (props.color === 'custom') return AVATAR_COLORS.primary
    return AVATAR_COLORS[props.color!]
  })

  const finalTextColor = computed(() => {
    if (props.textColor) return props.textColor
    return '#ffffff'
  })

  const avatarSize = computed(() => {
    if (isPresetSize(props.size)) {
      return AVATAR_SIZES[props.size]
    }
    return parseSize(props.size!)
  })

  const fontSize = computed(() => {
    if (isPresetSize(props.size)) {
      return AVATAR_FONT_SIZES[props.size]
    }
    const numericSize = typeof props.size === 'number' 
      ? props.size 
      : parseInt(props.size as string)
    return `${numericSize * 0.4}px`
  })

  const borderRadiusMap: Record<string, string> = {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '50%'
  }

  const borderRadius = computed(() => {
    if (props.tile) return '0'
    return borderRadiusMap[props.rounded!]
  })

  const showImage = computed(() => {
    return props.src && !imageError.value
  })

  const handleImageError = (event: Event): void => {
    imageError.value = true
  }

  const handleImageLoad = (event: Event): void => {
    imageLoaded.value = true
  }

  return {
    imageError,
    imageLoaded,
    baseColor,
    finalTextColor,
    avatarSize,
    fontSize,
    borderRadius,
    showImage,
    handleImageError,
    handleImageLoad
  }
}