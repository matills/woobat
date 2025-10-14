import type { App } from 'vue'
import { Alert, Button, Avatar } from './components'

const components = {
  'wb-alert': Alert,
  'wb-button': Button,
  'wb-avatar': Avatar,
}

export { Alert, Button, Avatar }
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