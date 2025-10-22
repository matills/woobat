import { h } from 'vue'
import type { VNode } from 'vue'

export const CheckIcon = (): VNode => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '3',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
}, [
  h('polyline', { points: '20 6 9 17 4 12' })
])

export const MinusIcon = (): VNode => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '3',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
}, [
  h('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
])