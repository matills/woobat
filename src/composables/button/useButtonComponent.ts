import { computed } from 'vue'
import type { ButtonProps } from '@/types'

export const useButtonComponent = (props: ButtonProps) => {
  const componentTag = computed(() => {
    if (props.tag === 'a' && props.href) return 'a'
    if ((props.tag === 'router-link' || props.tag === 'nuxt-link') && props.to) {
      return props.tag
    }
    return 'button'
  })

  const isRouterLink = computed(() => {
    return componentTag.value === 'router-link' || componentTag.value === 'nuxt-link'
  })

  const isDisabled = computed(() => {
    return props.disabled || props.loading
  })

  return {
    componentTag,
    isRouterLink,
    isDisabled
  }
}