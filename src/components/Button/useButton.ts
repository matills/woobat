import { computed, ref, nextTick, watch, useSlots, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { useRipple } from '@/composables/useRipple'
import { isLucideIcon, getLucideComponent, getIconSize, loadLucideIcons } from '@/utils/iconLoader'
import { getContrastingTextColor, createColorWithOpacity } from '@/utils/colorUtils'
import type { 
  ButtonProps, 
  ButtonEmits,
  ClickZone 
} from './Button.types'
import type { AdvancedClickEvent } from '@/types/global'
import {
  buttonSizeClasses,
  buttonVariantClasses,
  buttonColorClasses,
  buttonElevationClasses,
  buttonAnimationClasses
} from './Button.types'

export function useButton(props: ButtonProps, emit: (event: keyof ButtonEmits, ...args: any[]) => void) {
  const slots = useSlots()
  const buttonRef = ref<HTMLElement>()
  const iconsInitialized = ref(false)

  onMounted(async () => {
    try {
      await loadLucideIcons()
      iconsInitialized.value = true
    } catch (error) {
      console.warn('Button: Failed to load Lucide icons:', error)
      iconsInitialized.value = false
    }
  })

  const { rippleRef, createRipple } = useRipple({
    color: 'currentColor',
    opacity: 0.2,
    duration: 400
  })

  const enhancedIsLucideIcon = (iconName?: string) => {
    return iconsInitialized.value && isLucideIcon(iconName)
  }

  const enhancedGetLucideComponent = (iconName?: string) => {
    if (!iconsInitialized.value || !iconName) return null
    return getLucideComponent(iconName)
  }

  const enhancedGetIconSize = () => {
    return getIconSize(props.size)
  }

  const computedTag = computed(() => {
    if (props.href) return 'a'
    return props.tag || 'button'
  })

  const isRouterLink = computed(() => {
    return ['router-link', 'nuxt-link'].includes(props.tag || '')
  })

  const buttonClasses = computed(() => {
    const classes = ['wb-btn']
    
    if (props.size) classes.push(buttonSizeClasses[props.size])
    
    if (props.variant) classes.push(buttonVariantClasses[props.variant])
    
    if (props.color) classes.push(buttonColorClasses[props.color])
    
    if (props.elevation && props.elevation > 0) {
      classes.push(buttonElevationClasses[props.elevation])
    }
    
    if (props.disabled) classes.push('wb-btn--disabled')
    if (props.loading) classes.push('wb-btn--loading')
    
    if (props.block) classes.push('wb-btn--block')
    if (props.iconOnly) classes.push('wb-btn--icon-only')
    if (props.noPadding) classes.push('wb-btn--no-padding')
    
    if (props.rounded === true) {
      classes.push('wb-btn--rounded')
    } else if (typeof props.rounded === 'string') {
      classes.push(`wb-btn--rounded-${props.rounded}`)
    }
    
    if (props.clickAnimation && props.clickAnimation !== 'none') {
      classes.push(buttonAnimationClasses[props.clickAnimation])
    }
    
    if (props.class) {
      if (Array.isArray(props.class)) {
        classes.push(...props.class)
      } else if (typeof props.class === 'string') {
        classes.push(props.class)
      } else {
        Object.entries(props.class).forEach(([key, value]) => {
          if (value) classes.push(key)
        })
      }
    }
    
    return classes
  })

  const buttonStyles = computed(() => {
    const styles: CSSProperties = {}
    
    if (props.noPadding || props.padding === 'none') {
      styles.padding = '0'
      styles.margin = '0'
      styles.minWidth = 'auto'
      styles.minHeight = 'auto'
    } else if (props.padding !== 'auto' && props.padding) {
      styles.padding = typeof props.padding === 'number' ? `${props.padding}px` : props.padding
    }
    
    if (props.customColor) {
      styles['--wb-btn-custom-color'] = props.customColor
      applyCustomColorStyles(styles, props)
    }
    
    if (props.textColor) {
      styles.color = props.textColor
    }
    
    if (props.borderColor) {
      styles.borderColor = props.borderColor
      if (props.variant !== 'outlined' && props.variant !== 'text') {
        styles.border = `1px solid ${props.borderColor}`
      }
    }
    
    if (props.animationDuration) {
      styles['--wb-btn-animation-duration'] = `${props.animationDuration}ms`
    }
    
    if (props.style) {
      if (typeof props.style === 'string') {
        return { ...styles, cssText: props.style }
      } else {
        Object.assign(styles, props.style)
      }
    }
    
    return styles
  })

  const spinnerStyles = computed(() => {
    const size = enhancedGetIconSize()
    return {
      width: `${size}px`,
      height: `${size}px`
    }
  })

  const iconStyles = computed(() => {
    const styles: CSSProperties = {}
    if (props.iconColor) {
      styles.color = props.iconColor
    }
    return styles
  })

  const shouldShowLoadingText = computed(() => {
    return props.showLoadingText && (props.loadingText || props.preserveText || slots.loading)
  })

  const displayLoadingText = computed(() => {
    if (props.loadingText) return props.loadingText
    if (props.preserveText) return slots.default?.()?.[0]?.children || ''
    return ''
  })

  function applyCustomColorStyles(styles: CSSProperties, props: ButtonProps) {
    const { customColor, variant, textColor, borderColor } = props
    
    if (!customColor) return
    
    switch (variant) {
      case 'elevated':
        styles.backgroundColor = customColor
        if (!textColor) {
          styles.color = getContrastingTextColor(customColor)
        }
        break
        
      case 'text':
      case 'outlined':
        styles.backgroundColor = 'transparent'
        if (!textColor) {
          styles.color = customColor
        }
        if (variant === 'outlined' && !borderColor) {
          styles.borderColor = customColor
        }
        break
        
      case 'tonal':
        styles.backgroundColor = createColorWithOpacity(customColor, 0.12)
        if (!textColor) {
          styles.color = customColor
        }
        break
        
      default:
        styles.backgroundColor = customColor
        if (!borderColor) {
          styles.borderColor = customColor
        }
        break
    }
  }

  function getZoneStyles(zone: ClickZone): CSSProperties {
    const [x, y, width, height] = zone.area
    return {
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: `${width}%`,
      height: `${height}%`,
      zIndex: '10',
      background: 'transparent'
    }
  }

  function getAdvancedClickData(event: MouseEvent): AdvancedClickEvent {
    const rect = buttonRef.value?.getBoundingClientRect()
    if (!rect) {
      return {
        originalEvent: event,
        relativePosition: { x: 0, y: 0 },
        quadrant: 1
      }
    }
    
    const relativeX = (event.clientX - rect.left) / rect.width
    const relativeY = (event.clientY - rect.top) / rect.height
    const quadrant = relativeX < 0.5 
      ? (relativeY < 0.5 ? 1 : 4)
      : (relativeY < 0.5 ? 2 : 3)
      
    return {
      originalEvent: event,
      relativePosition: { x: relativeX, y: relativeY },
      quadrant: quadrant as 1 | 2 | 3 | 4
    }
  }

  function handleClick(event: MouseEvent) {
    if (props.disabled || props.loading) {
      event.preventDefault()
      return
    }
    
    if (props.ripple && !props.noPadding && buttonRef.value) {
      const rect = buttonRef.value.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      createRipple(x, y)
    }
    
    emit('click', event)
    
    if (props.detectQuadrant || props.clickZones?.length) {
      const advancedData = getAdvancedClickData(event)
      emit('advancedClick', advancedData)
    }
  }

  function handleZoneClick(zone: ClickZone, event: MouseEvent) {
    if (!zone.active && zone.active !== undefined) return
    
    event.stopPropagation()
    const advancedData = getAdvancedClickData(event)
    advancedData.zone = zone
    emit('zoneClick', zone, advancedData)
    zone.action(event)
  }

  function handleFocus(event: FocusEvent) {
    emit('focus', event)
  }

  function handleBlur(event: FocusEvent) {
    emit('blur', event)
  }

  function handleMouseEnter(event: MouseEvent) {
    emit('mouseenter', event)
  }

  function handleMouseLeave(event: MouseEvent) {
    emit('mouseleave', event)
  }

  watch(buttonRef, (newRef: HTMLElement | undefined) => {
    if (newRef && props.ripple) {
      nextTick(() => {
        rippleRef.value = newRef
      })
    }
  }, { immediate: true })

  function focus() {
    buttonRef.value?.focus()
  }

  function blur() {
    buttonRef.value?.blur()
  }

  return {
    buttonRef,
    iconsInitialized,
    
    computedTag,
    isRouterLink,
    buttonClasses,
    buttonStyles,
    spinnerStyles,
    iconStyles,
    shouldShowLoadingText,
    displayLoadingText,
    
    isLucideIcon: enhancedIsLucideIcon,
    getLucideComponent: enhancedGetLucideComponent,
    getIconSize: enhancedGetIconSize,
    
    getZoneStyles,
    
    handleClick,
    handleZoneClick,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
    
    focus,
    blur,
    createRipple
  }
}
