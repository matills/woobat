<template>
  <div :class="dividerClasses" :style="dividerStyles">
    <div v-if="hasContent && orientation === 'horizontal'" class="wb-divider__content" :style="contentStyles">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DividerProps } from '@/types'
import { useComponentStyles } from '@/composables/useComponentStyles'

defineOptions({
  name: 'wb-divider'
})

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
  color: 'secondary',
  thickness: '1px',
  textAlign: 'center',
  dashed: false
})

const { colorValue } = useComponentStyles({
  color: props.color,
  customColor: props.customColor
})

const hasContent = computed(() => !!(props.text || props.$slots?.default))

const dividerClasses = computed(() => {
  const classes = ['wb-divider', `wb-divider--${props.orientation}`]
  if (hasContent.value && props.orientation === 'horizontal') {
    classes.push('wb-divider--with-text', `wb-divider--text-${props.textAlign}`)
  }
  if (props.dashed) classes.push('wb-divider--dashed')
  if (props.class) classes.push(props.class)
  return classes
})

const dividerStyles = computed(() => {
  const styles: Record<string, any> = {
    borderColor: colorValue.value,
    opacity: 0.3
  }

  if (props.orientation === 'horizontal') {
    styles.borderTopWidth = props.thickness
    styles.margin = `${props.spacing || '1rem'} 0`
    if (props.length) {
      styles.width = props.length
    }
  } else {
    styles.borderLeftWidth = props.thickness
    styles.margin = `0 ${props.spacing || '1rem'}`
    styles.height = props.length || '100%'
  }

  if (props.style) {
    Object.assign(styles, props.style)
  }

  return styles
})

const contentStyles = computed(() => ({
  color: colorValue.value,
  opacity: 0.7
}))
</script>

<style scoped>
.wb-divider {
  border: 0;
  border-style: solid;
  font-family: system-ui, -apple-system, sans-serif;
}

.wb-divider--horizontal {
  width: 100%;
  border-top-style: solid;
}

.wb-divider--vertical {
  display: inline-block;
  height: 100%;
  border-left-style: solid;
  vertical-align: middle;
}

.wb-divider--dashed {
  border-style: dashed !important;
}

.wb-divider--with-text {
  display: flex;
  align-items: center;
  border: 0;
  position: relative;
}

.wb-divider--with-text::before,
.wb-divider--with-text::after {
  content: '';
  flex: 1;
  border-top-style: solid;
  border-top-width: inherit;
  border-color: inherit;
  opacity: inherit;
}

.wb-divider--text-left::before {
  flex: 0 0 5%;
}

.wb-divider--text-right::after {
  flex: 0 0 5%;
}

.wb-divider--text-center::before,
.wb-divider--text-center::after {
  flex: 1;
}

.wb-divider__content {
  padding: 0 1rem;
  font-size: 0.875rem;
  white-space: nowrap;
}

.wb-divider--dashed::before,
.wb-divider--dashed::after {
  border-top-style: dashed !important;
}
</style>
