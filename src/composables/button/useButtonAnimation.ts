import { ref } from 'vue'
import type { ButtonProps } from '@/types'

export const useButtonAnimation = (props: ButtonProps) => {
  const isAnimating = ref(false)

  const triggerAnimation = (): void => {
    isAnimating.value = true
    setTimeout(() => {
      isAnimating.value = false
    }, props.animationDuration)
  }

  return {
    isAnimating,
    triggerAnimation
  }
}