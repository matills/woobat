import type { App, Plugin } from 'vue'
import type { WoobatOptions } from './types/global'

import Button from './components/Button/Button.vue'

const components = {
  'wb-btn': Button,
} as const

const defaultOptions: WoobatOptions = {
  prefix: 'wb',
  theme: 'light',
  registerAllComponents: true,
  ripple: true,
  componentOptions: {},
}

export const WoobatUI: Plugin = {
  install(app: App, options: Partial<WoobatOptions> = {}) {
    const config = { ...defaultOptions, ...options }

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-wb-theme', config.theme)
    }

    app.provide('woobat-config', config)

    if (config.registerAllComponents) {
      Object.entries(components).forEach(([tagName, component]) => {
        const finalTagName = config.prefix !== 'wb' 
          ? tagName.replace('wb-', `${config.prefix}-`)
          : tagName

        app.component(finalTagName, component)
      })
    }

    app.config.globalProperties.$woobat = {
      setTheme(theme: 'light' | 'dark') {
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-wb-theme', theme)
        }
      },
      getTheme() {
        if (typeof document !== 'undefined') {
          return document.documentElement.getAttribute('data-wb-theme') || 'light'
        }
        return 'light'
      }
    }

    if (typeof document !== 'undefined' && !document.querySelector('[data-woobat-styles]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = '/node_modules/woobat-ui/dist/woobat.css'
      link.setAttribute('data-woobat-styles', 'true')
      document.head.appendChild(link)
    }
  }
}

export function registerComponents(app: App, componentNames: Array<keyof typeof components>) {
  componentNames.forEach(name => {
    if (components[name]) {
      app.component(name, components[name])
    }
  })
}

export {
  Button,
}

export type { WoobatOptions }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WoobatUI)
}

export default WoobatUI