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
      
      <span v-if="shouldShowLoadingText" class="wb-btn__loading-text">
        <slot name="loading">{{ displayLoadingText }}</slot>
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
import { useSlots } from 'vue'
import type { 
  ButtonProps, 
  ButtonEmits,
  ButtonSlots
} from './Button.types'
import { defaultButtonProps } from './Button.types'
import { useButton } from './useButton'

const props = withDefaults(defineProps<ButtonProps>(), defaultButtonProps)
const emit = defineEmits<ButtonEmits>()
const slots = useSlots()
defineSlots<ButtonSlots>()

const {
  buttonRef,
  computedTag,
  isRouterLink,
  buttonClasses,
  buttonStyles,
  spinnerStyles,
  iconStyles,
  shouldShowLoadingText,
  displayLoadingText,
  isLucideIcon,
  getLucideComponent,
  getIconSize,
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
} = useButton(props, emit)

defineExpose({
  $el: buttonRef,
  createRipple,
  focus,
  blur
})
</script>