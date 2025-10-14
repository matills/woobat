import type { AlertType } from '@/types'
import type { Component } from 'vue'
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon } from '@/components/Alert/icons'
import { THEME_COLORS } from './theme'

export const ALERT_TYPE_COLORS: Record<AlertType, string> = {
  success: THEME_COLORS.success,
  error: THEME_COLORS.error,
  warning: THEME_COLORS.warning,
  info: THEME_COLORS.info,
  custom: '#6b7280'
}

export const ALERT_TYPE_ICONS: Record<Exclude<AlertType, 'custom'>, Component> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: AlertTriangleIcon,
  info: InfoIcon
}