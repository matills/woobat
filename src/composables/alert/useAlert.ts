import { ref, computed } from 'vue'
import type { AlertProps } from '@/types'
import { ALERT_TYPE_COLORS } from '@/constants'
import { addOpacity } from '@/utils/colors'

export const useAlert = (props: AlertProps) => {
  const isVisible = ref(true)

  const finalColor = computed(() => 
    props.color || ALERT_TYPE_COLORS[props.type!]
  )

  const finalColorText = computed(() => {
    if (props.colorText) return props.colorText
    return props.variant === 'color' ? '#ffffff' : finalColor.value
  })

  const finalTitle = computed(() => {
    if (props.title) return props.title
    return props.type!.charAt(0).toUpperCase() + props.type!.slice(1)
  })

  const backgroundColor = computed(() => {
    if (props.variant === 'color') return finalColor.value
    if (props.variant === 'outlined') return 'transparent'
    return addOpacity(finalColor.value, 0.1)
  })

  const getBorderStyle = (): string => {
    if (props.variant === 'outlined') {
      return `1px solid ${finalColor.value}`
    }
    if (props.variant === 'border') {
      return `3px solid ${finalColor.value}`
    }
    return 'none'
  }

  const borderStyle = computed(() => getBorderStyle())

  const borderPosition = computed(() => {
    if (props.variant === 'outlined') return 'border'
    if (props.variant === 'border') return `border-${props.border}`
    return ''
  })

  const showIcon = computed(() => props.icon || props.customIcon)

  const handleClose = (): void => {
    isVisible.value = false
  }

  return {
    isVisible,
    finalColor,
    finalColorText,
    finalTitle,
    backgroundColor,
    borderStyle,
    borderPosition,
    showIcon,
    handleClose
  }
}