import { ref, computed, watch, inject, onMounted, readonly } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { WoobatOptions } from '@/types/global'

const globalTheme = ref<'light' | 'dark'>('light')

export interface UseThemeReturn {
  theme: Readonly<Ref<'light' | 'dark'>>
  setTheme: (newTheme: 'light' | 'dark') => void
  toggleTheme: () => void
  isDark: ComputedRef<boolean>
  isLight: ComputedRef<boolean>
  getCSSVar: (varName: string) => string
  setSystemTheme: () => void
  watchSystemTheme: (callback?: (isDark: boolean) => void) => () => void
}

export function useTheme(options?: {
  persist?: boolean
  storageKey?: string
  followSystem?: boolean
}): UseThemeReturn {
  const config = inject<WoobatOptions>('woobat-config')
  
  const {
    persist = true,
    storageKey = 'woobat-theme',
    followSystem = false
  } = options || {}

  const isDark = computed(() => globalTheme.value === 'dark')
  const isLight = computed(() => globalTheme.value === 'light')

  function applyThemeToDOM(theme: 'light' | 'dark') {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-wb-theme', theme)
    root.classList.remove('wb-light', 'wb-dark')
    root.classList.add(`wb-${theme}`)
  }

  function setTheme(newTheme: 'light' | 'dark') {
    globalTheme.value = newTheme
    applyThemeToDOM(newTheme)
    if (persist && typeof localStorage !== 'undefined') {
      localStorage.setItem(storageKey, newTheme)
    }
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('woobat-theme-change', {
        detail: { theme: newTheme, isDark: newTheme === 'dark' }
      }))
    }
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  function getCSSVar(varName: string): string {
    if (typeof document === 'undefined') return ''
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    const fullVarName = varName.startsWith('--') ? varName : `--wb-${varName}`
    return computedStyle.getPropertyValue(fullVarName).trim()
  }

  function getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  function setSystemTheme() {
    setTheme(getSystemTheme())
  }

  function watchSystemTheme(callback?: (isDark: boolean) => void) {
    if (typeof window === 'undefined') {
      return () => {}
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    function handleChange(e: MediaQueryListEvent) {
      const systemTheme = e.matches ? 'dark' : 'light'
      if (followSystem) {
        setTheme(systemTheme)
      }
      callback?.(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }

  function initTheme() {
    let initialTheme: 'light' | 'dark' = config?.theme || 'light'
    if (persist && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as 'light' | 'dark' | null
      if (stored && ['light', 'dark'].includes(stored)) {
        initialTheme = stored
      }
    }
    if (followSystem) {
      initialTheme = getSystemTheme()
    }
    globalTheme.value = initialTheme
    applyThemeToDOM(initialTheme)
  }

  onMounted(() => {
    initTheme()
    if (followSystem) {
      watchSystemTheme()
    }
  })

  watch(globalTheme, (newTheme) => {
    applyThemeToDOM(newTheme)
  })

  return {
    theme: readonly(globalTheme),
    setTheme,
    toggleTheme,
    isDark,
    isLight,
    getCSSVar,
    setSystemTheme,
    watchSystemTheme
  }
}

export function useCurrentTheme() {
  return {
    isDark: computed(() => globalTheme.value === 'dark'),
    isLight: computed(() => globalTheme.value === 'light'),
    theme: readonly(globalTheme)
  }
}