import type { App } from 'vue'
import { Alert } from './components'

const components = {
  'wb-alert': Alert
}

export { Alert }
export * from './types'
export * from './utils/colors'
export * from './constants'
export * from './components/Alert/icons'

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}