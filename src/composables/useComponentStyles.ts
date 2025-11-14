import { computed, type ComputedRef } from 'vue'
import type { ColorVariant, ComponentSize, BorderRadius } from '@/types'
import { THEME_COLORS, COMPONENT_SIZES, BORDER_RADIUS } from '@/constants'
import { isValidColor, hexToRgb, addOpacity } from '@/utils'

interface UseComponentStylesOptions {
  color?: ColorVariant
  customColor?: string
  size?: ComponentSize
  rounded?: BorderRadius
  disabled?: boolean
}

interface ComponentStylesResult {
  colorValue: ComputedRef<string>
  sizeConfig: ComputedRef<{ padding: string; fontSize: string; height: string }>
  borderRadiusValue: ComputedRef<string>
  backgroundColorWithOpacity: ComputedRef<string>
}

export const useComponentStyles = (options: UseComponentStylesOptions): ComponentStylesResult => {
  const colorValue = computed(() => {
    if (options.color === 'custom' && options.customColor && isValidColor(options.customColor)) {
      return options.customColor
    }
    return options.color && options.color !== 'custom' ? THEME_COLORS[options.color] : THEME_COLORS.primary
  })

  const sizeConfig = computed(() => {
    return options.size ? COMPONENT_SIZES[options.size] : COMPONENT_SIZES.md
  })

  const borderRadiusValue = computed(() => {
    return options.rounded ? BORDER_RADIUS[options.rounded] : BORDER_RADIUS.md
  })

  const backgroundColorWithOpacity = computed(() => {
    const color = colorValue.value
    const rgb = hexToRgb(color)
    return rgb ? addOpacity(rgb, 0.1) : color
  })

  return {
    colorValue,
    sizeConfig,
    borderRadiusValue,
    backgroundColorWithOpacity
  }
}
