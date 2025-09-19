import type { CSSProperties } from 'vue'
import type { 
  ComponentSize, 
  ColorVariant, 
  ButtonVariant, 
  BorderRadius, 
  ElevationLevel,
  BaseComponentProps,
  AdvancedClickEvent,
  ClickZone
} from '@/types/global'

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant
  size?: ComponentSize
  color?: ColorVariant
  customColor?: string
  textColor?: string
  borderColor?: string
  iconColor?: string
  block?: boolean
  rounded?: BorderRadius
  elevation?: ElevationLevel
  loading?: boolean
  loadingText?: string
  ripple?: boolean
  iconLeft?: string
  iconRight?: string
  iconOnly?: boolean
  padding?: string | number | 'none'
  noPadding?: boolean
  tag?: 'button' | 'a' | 'router-link' | 'nuxt-link'
  href?: string
  target?: string
  to?: string | object
  type?: 'button' | 'submit' | 'reset'
  clickZones?: ClickZone[]
  detectQuadrant?: boolean
  clickAnimation?: 'scale' | 'shake' | 'pulse' | 'bounce' | 'none'
  animationDuration?: number
  contentClass?: string
  contentStyle?: CSSProperties | string
}

export interface ButtonEmits {
  click: [event: MouseEvent]
  advancedClick: [event: AdvancedClickEvent]
  zoneClick: [zone: ClickZone, event: AdvancedClickEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
}

export interface ButtonSlots {
  default?: () => any
  loader?: () => any
  iconLeft?: () => any
  iconRight?: () => any
  loading?: () => any
  spinner?: () => any
}

export const defaultButtonProps: Required<Omit<ButtonProps, keyof BaseComponentProps | 'href' | 'target' | 'to' | 'clickZones' | 'loadingText' | 'iconLeft' | 'iconRight' | 'contentClass' | 'contentStyle' | 'customColor' | 'textColor' | 'borderColor' | 'iconColor'>> = {
  variant: 'filled',
  size: 'md',
  color: 'primary',
  block: false,
  rounded: true,
  elevation: 0,
  loading: false,
  ripple: true,
  iconOnly: false,
  padding: 'auto',
  noPadding: false,
  tag: 'button',
  type: 'button',
  detectQuadrant: false,
  clickAnimation: 'scale',
  animationDuration: 150
}

export const buttonSizeClasses = {
  xs: 'wb-btn--xs',
  sm: 'wb-btn--sm', 
  md: 'wb-btn--md',
  lg: 'wb-btn--lg',
  xl: 'wb-btn--xl'
} as const

export const buttonVariantClasses = {
  filled: 'wb-btn--filled',
  tonal: 'wb-btn--tonal',
  outlined: 'wb-btn--outlined',
  text: 'wb-btn--text',
  elevated: 'wb-btn--elevated'
} as const

export const buttonColorClasses = {
  primary: 'wb-btn--primary',
  secondary: 'wb-btn--secondary',
  success: 'wb-btn--success',
  warning: 'wb-btn--warning',
  error: 'wb-btn--error',
  info: 'wb-btn--info'
} as const

export const buttonElevationClasses = {
  0: '',
  1: 'wb-btn--elevation-1',
  2: 'wb-btn--elevation-2',
  3: 'wb-btn--elevation-3',
  4: 'wb-btn--elevation-4',
  5: 'wb-btn--elevation-5'
} as const

export const buttonAnimationClasses = {
  scale: 'wb-btn--anim-scale',
  shake: 'wb-btn--anim-shake', 
  pulse: 'wb-btn--anim-pulse',
  bounce: 'wb-btn--anim-bounce',
  none: ''
} as const