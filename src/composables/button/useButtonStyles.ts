import { computed } from 'vue'
import type { ButtonProps } from '@/types'
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_ROUNDED, BUTTON_ELEVATION } from '@/constants'
import { addOpacity, parsePadding, mergeStyles } from '@/utils'

export const useButtonStyles = (props: ButtonProps) => {
  const baseColor = computed(() => {
    if (props.customColor) return props.customColor
    if (props.color === 'custom') return BUTTON_COLORS.primary
    return BUTTON_COLORS[props.color!]
  })

  const finalTextColor = computed(() => {
    if (props.textColor) return props.textColor
    if (props.variant === 'filled' || props.variant === 'elevated') return '#ffffff'
    return baseColor.value
  })

  const getVariantStyles = (): Record<string, any> => {
    const variants = {
      filled: {
        backgroundColor: baseColor.value,
        color: finalTextColor.value
      },
      outlined: {
        backgroundColor: 'transparent',
        color: finalTextColor.value,
        border: `1px solid ${props.borderColor || baseColor.value}`
      },
      text: {
        backgroundColor: 'transparent',
        color: finalTextColor.value
      },
      elevated: {
        backgroundColor: baseColor.value,
        color: finalTextColor.value,
        boxShadow: BUTTON_ELEVATION[3]
      },
      tonal: {
        backgroundColor: addOpacity(baseColor.value, 0.12),
        color: baseColor.value
      }
    }

    return variants[props.variant!] || variants.filled
  }

  const getPaddingStyles = (): string => {
    if (props.noPadding || props.padding === 'none') return '0'
    if (props.padding) return parsePadding(props.padding)
    if (!props.iconOnly) return BUTTON_SIZES[props.size!].padding
    return '0'
  }

  const getSizeStyles = (): Record<string, any> => {
    const sizeConfig = BUTTON_SIZES[props.size!]
    const styles: Record<string, any> = {
      height: sizeConfig.height
    }

    if (!props.iconOnly) {
      styles.fontSize = sizeConfig.fontSize
    } else {
      styles.width = sizeConfig.height
    }

    return styles
  }

  const buttonStyles = computed(() => {
    const styles: Record<string, any> = {
      borderRadius: BUTTON_ROUNDED[props.rounded!],
      boxShadow: BUTTON_ELEVATION[props.elevation!],
      padding: getPaddingStyles(),
      ...getSizeStyles(),
      ...getVariantStyles()
    }

    return mergeStyles(styles, props.style)
  })

  const mergedContentStyle = computed(() => {
    if (!props.contentStyle) return {}
    return typeof props.contentStyle === 'string' 
      ? props.contentStyle 
      : props.contentStyle
  })

  return {
    buttonStyles,
    mergedContentStyle,
    baseColor,
    finalTextColor
  }
}