import type { AlertType } from '@/types'
import type { Component } from 'vue'
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon } from '@/components/Alert/icons'

export const ALERT_TYPE_COLORS: Record<AlertType, string> = {
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  custom: '#6b7280'
}

export const ALERT_TYPE_ICONS: Record<Exclude<AlertType, 'custom'>, Component> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: AlertTriangleIcon,
  info: InfoIcon
}
