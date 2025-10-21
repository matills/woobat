import type { App } from 'vue'
import components from './components'

export * from './types'
export * from './utils'
export * from './constants'
export * from './composables'
export * from './components/Alert/icons'
export * from './components/Button/icons'
export * from './components/Chip/icons'

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      const kebabName = `wb-${name.toLowerCase()}`
      app.component(kebabName, component)
    })
  }
}