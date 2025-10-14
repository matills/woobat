import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

export interface RippleOptions {
  color?: string
  duration?: number
  opacity?: number
  centered?: boolean
  radius?: number
  disabled?: boolean
}

export interface UseRippleReturn {
  rippleRef: Ref<HTMLElement | null>
  createRipple: (x?: number, y?: number) => void
  setEnabled: (enabled: boolean) => void
  clearRipples: () => void
}

interface RippleStyle {
  position: string
  borderRadius: string
  backgroundColor: string
  opacity: string
  pointerEvents: string
  left: string
  top: string
  width: string
  height: string
  transform: string
  transition: string
  zIndex: string
}

const DEFAULT_OPTIONS: Required<RippleOptions> = {
  color: 'currentColor',
  duration: 600,
  opacity: 0.3,
  centered: false,
  radius: 0,
  disabled: false
}

export function useRipple(options: RippleOptions = {}): UseRippleReturn {
  const config = { ...DEFAULT_OPTIONS, ...options }
  const rippleRef = ref<HTMLElement | null>(null)
  const isEnabled = ref(!config.disabled)
  const activeRipples = new Set<HTMLElement>()

  const createRippleStyle = (x: number, y: number, size: number): RippleStyle => ({
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: config.color,
    opacity: config.opacity.toString(),
    pointerEvents: 'none',
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    transform: 'scale(0)',
    transition: `transform ${config.duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${config.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    zIndex: '0'
  })

  const createRippleElement = (x: number, y: number, size: number): HTMLElement => {
    const ripple = document.createElement('span')
    ripple.className = 'wb-ripple'
    Object.assign(ripple.style, createRippleStyle(x, y, size))
    return ripple
  }

  const calculateRippleSize = (element: HTMLElement, x?: number, y?: number): number => {
    const rect = element.getBoundingClientRect()
    
    if (config.radius) {
      return Math.max(rect.width, rect.height) * (config.radius / 100)
    }
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const clickX = x ?? centerX
    const clickY = y ?? centerY
    
    const distanceToCorners = [
      Math.sqrt(clickX ** 2 + clickY ** 2),
      Math.sqrt((rect.width - clickX) ** 2 + clickY ** 2),
      Math.sqrt(clickX ** 2 + (rect.height - clickY) ** 2),
      Math.sqrt((rect.width - clickX) ** 2 + (rect.height - clickY) ** 2),
    ]
    
    return Math.max(...distanceToCorners) * 2
  }

  const ensureElementStyles = (element: HTMLElement): void => {
    const computedStyle = getComputedStyle(element)
    if (computedStyle.position === 'static') {
      element.style.position = 'relative'
    }
    if (computedStyle.overflow === 'visible') {
      element.style.overflow = 'hidden'
    }
  }

  const animateRipple = (ripple: HTMLElement): void => {
    ripple.offsetHeight
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)'
    })
  }

  const removeRipple = (ripple: HTMLElement): void => {
    ripple.style.opacity = '0'
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple)
      }
      activeRipples.delete(ripple)
    }, config.duration / 2)
  }

  const createRipple = (x?: number, y?: number): void => {
    if (!isEnabled.value || !rippleRef.value) return
    
    const element = rippleRef.value
    const rect = element.getBoundingClientRect()
    
    ensureElementStyles(element)
    
    const relativeX = x ?? rect.width / 2
    const relativeY = y ?? rect.height / 2
    const size = calculateRippleSize(element, relativeX, relativeY)
    
    const ripple = createRippleElement(relativeX, relativeY, size)
    element.appendChild(ripple)
    activeRipples.add(ripple)
    
    animateRipple(ripple)
    
    setTimeout(() => {
      removeRipple(ripple)
    }, config.duration / 2)
  }

  const getClickCoordinates = (event: MouseEvent | TouchEvent, rect: DOMRect): { x: number; y: number } => {
    if (config.centered) {
      return { x: rect.width / 2, y: rect.height / 2 }
    }
    
    if (event instanceof MouseEvent) {
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }
    
    const touch = event.touches[0]
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    }
  }

  const handlePointerDown = (event: MouseEvent | TouchEvent): void => {
    if (!isEnabled.value || !rippleRef.value) return
    
    const rect = rippleRef.value.getBoundingClientRect()
    const { x, y } = getClickCoordinates(event, rect)
    createRipple(x, y)
  }

  const clearRipples = (): void => {
    activeRipples.forEach(ripple => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple)
      }
    })
    activeRipples.clear()
  }

  const setEnabled = (enabled: boolean): void => {
    isEnabled.value = enabled
    if (!enabled) clearRipples()
  }

  const setupEventListeners = (): void => {
    const element = rippleRef.value
    if (!element) return
    
    element.addEventListener('mousedown', handlePointerDown, { passive: true })
    element.addEventListener('touchstart', handlePointerDown, { passive: true })
  }

  const cleanupEventListeners = (): void => {
    const element = rippleRef.value
    if (!element) return
    
    element.removeEventListener('mousedown', handlePointerDown)
    element.removeEventListener('touchstart', handlePointerDown)
  }

  onMounted(() => {
    if (rippleRef.value) setupEventListeners()
  })

  onBeforeUnmount(() => {
    cleanupEventListeners()
    clearRipples()
  })

  return {
    rippleRef,
    createRipple,
    setEnabled,
    clearRipples
  }
} 