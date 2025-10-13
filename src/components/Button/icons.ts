import { h } from 'vue'
import type { VNode } from 'vue'

export const LoadingIcon = (): VNode => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  class: 'animate-spin'
}, [
  h('path', { d: 'M21 12a9 9 0 1 1-6.219-8.56' })
])