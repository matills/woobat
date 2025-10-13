import type { App } from 'vue'
import { Alert, Button } from './components'

const components = {
  'wb-alert': Alert,
  'wb-button': Button
}

export { Alert, Button }
export * from './types'
export * from './utils'
export * from './constants'
export * from './composables'
export * from './components/Alert/icons'
export * from './components/Button/icons'

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}