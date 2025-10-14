import { computed } from 'vue'
import type { AvatarProps } from '@/types'
import { ELEVATION } from '@/constants'
import { mergeStyles } from '@/utils'

interface UseAvatarStylesParams {
  baseColor: string
  finalTextColor: string
  avatarSize: string
  fontSize: string
  borderRadius: string
}

export const useAvatarStyles = (
  props: AvatarProps,
  {
    baseColor,
    finalTextColor,
    avatarSize,
    fontSize,
    borderRadius
  }: UseAvatarStylesParams
) => {
  const avatarStyles = computed(() => {
    const styles: Record<string, any> = {
      backgroundColor: baseColor,
      color: finalTextColor,
      width: avatarSize,
      height: avatarSize,
      fontSize: fontSize,
      borderRadius: borderRadius
    }

    if (props.elevation !== undefined) {
      styles.boxShadow = ELEVATION[props.elevation as keyof typeof ELEVATION]
    }

    if (props.bordered) {
      const width = typeof props.borderWidth === 'number' 
        ? `${props.borderWidth}px` 
        : props.borderWidth || '2px'
      styles.border = `${width} solid ${props.borderColor || '#ffffff'}`
    }

    return mergeStyles(styles, props.style)
  })

  return {
    avatarStyles
  }
}