import type { CSSProperties } from 'vue'

export interface WoobatOptions {
  prefix: string
  theme: 'light' | 'dark'
  registerAllComponents: boolean
  ripple: boolean
  componentOptions: {
    button?: Partial<ButtonDefaultProps>
  }
}

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated'
export type BorderRadius = boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5
export interface ButtonDefaultProps {
  variant: ButtonVariant
  size: ComponentSize
  color: ColorVariant
  block: boolean
  rounded: BorderRadius
  elevation: ElevationLevel
  ripple: boolean
  loading: boolean
  disabled: boolean
}

export interface ClickZone {
  id: string
  area: [number, number, number, number]
  action: (event: MouseEvent) => void
  active?: boolean
}

export interface AdvancedClickEvent {
  originalEvent: MouseEvent
  relativePosition: { x: number; y: number }
  zone?: ClickZone
  quadrant: 1 | 2 | 3 | 4
}

export interface BaseComponentProps {
  class?: string | string[] | Record<string, boolean>
  style?: CSSProperties | string 
  id?: string
  disabled?: boolean
  testId?: string
}

export interface ThemeConfig {
  colors: Record<string, string>
  spacing: Record<string, string>
  typography: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
}

export type CSSVariables = Record<`--${string}`, string | number>

export interface ThemeComposable {
  theme: Readonly<Ref<'light' | 'dark'>>
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  isDark: ComputedRef<boolean>
  isLight: ComputedRef<boolean>
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $woobat: {
      setTheme: (theme: 'light' | 'dark') => void
      getTheme: () => string
    }
  }
  
  interface GlobalComponents {
    'wb-btn': typeof import('../components/Button/Button.vue')['default']
  }
}

declare global {
  interface Window {
    Vue?: any
  }
}

export {}