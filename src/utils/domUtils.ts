export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export function isServer(): boolean {
  return !isBrowser()
}

export function getComputedStyleProperty(element: HTMLElement, property: string): string {
  if (!isBrowser() || !element) return ''
  
  try {
    const computedStyle = window.getComputedStyle(element)
    return computedStyle.getPropertyValue(property).trim()
  } catch (error) {
    console.warn('Failed to get computed style property:', property, error)
    return ''
  }
}

export function setCSSCustomProperty(element: HTMLElement | null, property: string, value: string): void {
  if (!isBrowser() || !element) return
  
  try {
    const propertyName = property.startsWith('--') ? property : `--${property}`
    element.style.setProperty(propertyName, value)
  } catch (error) {
    console.warn('Failed to set CSS custom property:', property, error)
  }
}

export function getCSSCustomProperty(element: HTMLElement | null, property: string): string {
  if (!isBrowser() || !element) return ''
  
  try {
    const propertyName = property.startsWith('--') ? property : `--${property}`
    return getComputedStyleProperty(element, propertyName)
  } catch (error) {
    console.warn('Failed to get CSS custom property:', property, error)
    return ''
  }
}

export function addEventListenerWithCleanup(
  element: HTMLElement | Window | Document,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): () => void {
  if (!isBrowser()) return () => {}
  
  element.addEventListener(event, handler, options)
  
  return () => {
    element.removeEventListener(event, handler, options)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null
  let lastExecTime = 0
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = window.setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
        timeoutId = null
      }, delay - (currentTime - lastExecTime))
    }
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = window.setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }
}

export function getElementDimensions(element: HTMLElement | null): { width: number; height: number } {
  if (!isBrowser() || !element) {
    return { width: 0, height: 0 }
  }
  
  try {
    const rect = element.getBoundingClientRect()
    return {
      width: rect.width,
      height: rect.height
    }
  } catch (error) {
    console.warn('Failed to get element dimensions:', error)
    return { width: 0, height: 0 }
  }
}

export function isElementInViewport(element: HTMLElement | null): boolean {
  if (!isBrowser() || !element) return false
  
  try {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  } catch (error) {
    console.warn('Failed to check if element is in viewport:', error)
    return false
  }
}

export function focusElement(element: HTMLElement | null, delay: number = 0): void {
  if (!isBrowser() || !element) return
  
  const focus = () => {
    try {
      if (element && typeof element.focus === 'function') {
        element.focus()
      }
    } catch (error) {
      console.warn('Failed to focus element:', error)
    }
  }
  
  if (delay > 0) {
    setTimeout(focus, delay)
  } else {
    focus()
  }
}

export function dispatchCustomEvent(
  element: HTMLElement | Window | Document,
  eventName: string,
  detail?: any,
  options: CustomEventInit = {}
): boolean {
  if (!isBrowser()) return false
  
  try {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail,
      ...options
    })
    
    return element.dispatchEvent(event)
  } catch (error) {
    console.warn('Failed to dispatch custom event:', eventName, error)
    return false
  }
}
