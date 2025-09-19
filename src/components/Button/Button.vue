<template>
  <component
    :is="computedTag"
    ref="buttonRef"
    :class="buttonClasses"
    :style="buttonStyles"
    :disabled="disabled || loading"
    :type="tag === 'button' ? type : undefined"
    :href="tag === 'a' ? href : undefined"
    :target="tag === 'a' ? target : undefined"
    :to="isRouterLink ? to : undefined"
    v-bind="$attrs"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >

    <div
      v-if="loading"
      class="wb-btn__loading-overlay"
      :class="{ 'wb-btn__loading-overlay--visible': loading }"
    >
      <slot name="loader">
        <div class="wb-btn__spinner" :style="spinnerStyles">
          <slot name="spinner">
            <svg viewBox="0 0 24 24" class="wb-btn__spinner-icon wb-btn__spinner-icon--modern">
              <circle 
                cx="12" 
                cy="12" 
                r="9" 
                stroke="currentColor" 
                stroke-width="3" 
                fill="none"
                stroke-linecap="round"
                stroke-dasharray="14.137 14.137"
                opacity="0.25"
              />
              <circle 
                cx="12" 
                cy="12" 
                r="9" 
                stroke="currentColor" 
                stroke-width="3" 
                fill="none"
                stroke-linecap="round"
                stroke-dasharray="14.137 14.137"
                stroke-dashoffset="14.137"
              >
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  type="rotate"
                  values="0 12 12;360 12 12"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </slot>
        </div>
      </slot>
      
      <span v-if="loadingText || $slots.loading" class="wb-btn__loading-text">
        <slot name="loading">{{ loadingText }}</slot>
      </span>
    </div>

    <span 
      class="wb-btn__content"
      :class="[contentClass, { 'wb-btn__content--hidden': loading }]"
      :style="contentStyle"
    >
      <span v-if="iconLeft || $slots.iconLeft" class="wb-btn__icon wb-btn__icon--left" :style="iconStyles">
        <slot name="iconLeft">
          <component 
            v-if="isLucideIcon(iconLeft)"
            :is="getLucideComponent(iconLeft)"
            :size="getIconSize()"
          />
          <i v-else :class="iconLeft" />
        </slot>
      </span>

      <span v-if="!iconOnly" class="wb-btn__text">
        <slot />
      </span>

      <span v-if="iconRight || $slots.iconRight" class="wb-btn__icon wb-btn__icon--right" :style="iconStyles">
        <slot name="iconRight">
          <component 
            v-if="isLucideIcon(iconRight)"
            :is="getLucideComponent(iconRight)"
            :size="getIconSize()"
          />
          <i v-else :class="iconRight" />
        </slot>
      </span>
    </span>

    <div 
      v-if="clickZones && clickZones.length > 0"
      class="wb-btn__zones-overlay"
    >
      <div
        v-for="zone in clickZones"
        :key="zone.id"
        class="wb-btn__click-zone"
        :style="getZoneStyles(zone)"
        :data-zone-id="zone.id"
        @click.stop="handleZoneClick(zone, $event)"
      />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'
import { useRipple } from '@/composables/useRipple'
import type { CSSProperties } from 'vue'
import type { 
  ButtonProps, 
  ButtonEmits,
  ButtonSlots
} from './Button.types'
import type { AdvancedClickEvent, ClickZone } from '@/types/global'
import {
  defaultButtonProps,
  buttonSizeClasses,
  buttonVariantClasses,
  buttonColorClasses,
  buttonElevationClasses,
  buttonAnimationClasses
} from './Button.types'

let LucideIcons: any = null
let lucideLoadPromise: Promise<any> | null = null

function loadLucideIcons() {
  if (LucideIcons !== null) return Promise.resolve(LucideIcons)
  if (lucideLoadPromise) return lucideLoadPromise
  
  lucideLoadPromise = import('lucide-vue-next')
    .then((icons) => {
      LucideIcons = icons
      return icons
    })
    .catch((e) => {
      console.warn('Woobat UI: lucide-vue-next is not installed. Icon support will be limited to CSS classes.')
      LucideIcons = false
      return null
    })
  
  return lucideLoadPromise
}

const props = withDefaults(defineProps<ButtonProps>(), defaultButtonProps)
const emit = defineEmits<ButtonEmits>()
defineSlots<ButtonSlots>()

const buttonRef = ref<HTMLElement>()

const { rippleRef, createRipple } = useRipple({
  color: 'currentColor',
  opacity: 0.2,
  duration: 400
})

function isLucideIcon(iconName?: string): boolean {
  if (!iconName || LucideIcons === false) return false
  
  const hasPrefix = iconName.includes('fa-') || 
                   iconName.includes('icon-') || 
                   iconName.includes('material-') ||
                   iconName.includes(' ') ||
                   iconName.startsWith('.')
  
  if (hasPrefix) return false
  
  if (!LucideIcons) {
    loadLucideIcons()
    return false
  }
  
  const pascalName = iconName.charAt(0).toUpperCase() + iconName.slice(1)
  return !!(LucideIcons[pascalName] || LucideIcons[iconName])
}

function getLucideComponent(iconName?: string) {
  if (!iconName || !LucideIcons || LucideIcons === false) return null
  
  const pascalName = iconName.charAt(0).toUpperCase() + iconName.slice(1)
  return LucideIcons[pascalName] || LucideIcons[iconName] || null
}

function getIconSize(): number {
  switch (props.size) {
    case 'xs': return 12
    case 'sm': return 14
    case 'md': return 16
    case 'lg': return 18
    case 'xl': return 20
    default: return 16
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  hex = hex.replace('#', '')
  
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }
  
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return { r, g, b }
  }
  
  return null
}

const computedTag = computed(() => {
  if (props.href) return 'a'
  return props.tag
})

const isRouterLink = computed(() => {
  return ['router-link', 'nuxt-link'].includes(props.tag)
})

const buttonClasses = computed(() => {
  const classes = ['wb-btn']
  if (props.size) classes.push(buttonSizeClasses[props.size])
  if (props.variant) classes.push(buttonVariantClasses[props.variant])
  if (props.color) classes.push(buttonColorClasses[props.color])
  if (props.elevation && props.elevation > 0) classes.push(buttonElevationClasses[props.elevation])
  if (props.disabled) classes.push('wb-btn--disabled')
  if (props.loading) classes.push('wb-btn--loading')
  if (props.block) classes.push('wb-btn--block')
  if (props.iconOnly) classes.push('wb-btn--icon-only')
  if (props.noPadding) classes.push('wb-btn--no-padding')
  if (props.rounded === true) classes.push('wb-btn--rounded')
  else if (typeof props.rounded === 'string') classes.push(`wb-btn--rounded-${props.rounded}`)
  if (props.clickAnimation && props.clickAnimation !== 'none') classes.push(buttonAnimationClasses[props.clickAnimation])
  if (props.class) {
    if (Array.isArray(props.class)) classes.push(...props.class)
    else if (typeof props.class === 'string') classes.push(props.class)
    else {
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
    
    if (props.variant === 'elevated') {
      styles.backgroundColor = props.customColor
      if (!props.textColor) {
        const rgb = hexToRgb(props.customColor)
        if (rgb) {
          const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
          styles.color = brightness > 128 ? '#000000' : '#ffffff'
        } else {
          styles.color = '#ffffff'
        }
      }
    } else if (props.variant === 'text' || props.variant === 'outlined') {
      styles.backgroundColor = 'transparent'
      if (!props.textColor) {
        styles.color = props.customColor
      }
      if (props.variant === 'outlined' && !props.borderColor) {
        styles.borderColor = props.customColor
      }
    } else if (props.variant === 'tonal') {
      styles.backgroundColor = `color-mix(in srgb, ${props.customColor} 12%, transparent)`
      if (!props.textColor) {
        styles.color = props.customColor
      }
    } else {
      styles.backgroundColor = props.customColor
      if (!props.borderColor) {
        styles.borderColor = props.customColor
      }
    }
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
  
  if (props.animationDuration) styles['--wb-btn-animation-duration'] = `${props.animationDuration}ms`
  if (props.style) {
    if (typeof props.style === 'string') {
      return { ...styles, cssText: props.style }
    } else {
      Object.assign(styles, props.style)
    }
  }
  return styles
})

const spinnerStyles = computed(() => ({
  width: props.size === 'xs' ? '12px' : 
         props.size === 'sm' ? '14px' :
         props.size === 'lg' ? '20px' :
         props.size === 'xl' ? '22px' : '16px',
  height: props.size === 'xs' ? '12px' : 
          props.size === 'sm' ? '14px' :
          props.size === 'lg' ? '20px' :
          props.size === 'xl' ? '22px' : '16px'
}))

const iconStyles = computed(() => {
  const styles: CSSProperties = {}
  if (props.iconColor) {
    styles.color = props.iconColor
  }
  return styles
})

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
  if (props.ripple && buttonRef.value) {
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

watch(buttonRef, (newRef) => {
  if (newRef && props.ripple) {
    nextTick(() => {
      rippleRef.value = newRef
    })
  }
}, { immediate: true })

defineExpose({
  $el: buttonRef,
  createRipple,
  focus: () => buttonRef.value?.focus(),
  blur: () => buttonRef.value?.blur()
})
</script>