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

export function useRipple(options: RippleOptions = {}): UseRippleReturn {
  const {
    color = 'currentColor',
    duration = 600,
    opacity = 0.3,
    centered = false,
    radius,
    disabled = false
  } = options

  const rippleRef = ref<HTMLElement | null>(null)
  const isEnabled = ref(!disabled)
  const activeRipples = new Set<HTMLElement>()

  function createRippleElement(x: number, y: number, size: number): HTMLElement {
    const ripple = document.createElement('span')
    ripple.className = 'wb-ripple'
    Object.assign(ripple.style, {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: color,
      opacity: opacity.toString(),
      pointerEvents: 'none',
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      transform: 'scale(0)',
      transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      zIndex: '0'
    })
    return ripple
  }

  function calculateRippleSize(element: HTMLElement, x?: number, y?: number): number {
    if (radius) {
      const rect = element.getBoundingClientRect()
      return Math.max(rect.width, rect.height) * (radius / 100)
    }
    const rect = element.getBoundingClientRect()
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

  function createRipple(x?: number, y?: number) {
    if (!isEnabled.value || !rippleRef.value) return
    const element = rippleRef.value
    const rect = element.getBoundingClientRect()
    const computedStyle = getComputedStyle(element)
    if (computedStyle.position === 'static') {
      element.style.position = 'relative'
    }
    if (computedStyle.overflow === 'visible') {
      element.style.overflow = 'hidden'
    }
    const relativeX = x ?? rect.width / 2
    const relativeY = y ?? rect.height / 2
    const size = calculateRippleSize(element, relativeX, relativeY)
    const ripple = createRippleElement(relativeX, relativeY, size)
    element.appendChild(ripple)
    activeRipples.add(ripple)
    ripple.offsetHeight
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)'
    })
    setTimeout(() => {
      ripple.style.opacity = '0'
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple)
        }
        activeRipples.delete(ripple)
      }, duration / 2)
    }, duration / 2)
  }

  function handlePointerDown(event: MouseEvent | TouchEvent) {
    if (!isEnabled.value || !rippleRef.value) return
    const rect = rippleRef.value.getBoundingClientRect()
    let x: number, y: number
    if (centered) {
      x = rect.width / 2
      y = rect.height / 2
    } else {
      if (event instanceof MouseEvent) {
        x = event.clientX - rect.left
        y = event.clientY - rect.top
      } else {
        const touch = event.touches[0]
        x = touch.clientX - rect.left
        y = touch.clientY - rect.top
      }
    }
    createRipple(x, y)
  }

  function clearRipples() {
    activeRipples.forEach(ripple => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple)
      }
    })
    activeRipples.clear()
  }

  function setEnabled(enabled: boolean) {
    isEnabled.value = enabled
    if (!enabled) {
      clearRipples()
    }
  }

  function setupEventListeners() {
    const element = rippleRef.value
    if (!element) return
    element.addEventListener('mousedown', handlePointerDown, { passive: true })
    element.addEventListener('touchstart', handlePointerDown, { passive: true })
    element.addEventListener('selectstart', (e) => e.preventDefault())
  }

  function cleanupEventListeners() {
    const element = rippleRef.value
    if (!element) return
    element.removeEventListener('mousedown', handlePointerDown)
    element.removeEventListener('touchstart', handlePointerDown)
    element.removeEventListener('selectstart', (e) => e.preventDefault())
  }

  onMounted(() => {
    if (rippleRef.value) {
      setupEventListeners()
    }
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

export const rippleCSS = `
.wb-ripple {
  --wb-ripple-color: currentColor;
  --wb-ripple-opacity: 0.3;
  --wb-ripple-duration: 600ms;
}

[data-wb-theme="dark"] .wb-ripple {
  --wb-ripple-opacity: 0.2;
}
`
