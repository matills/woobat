import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router/routes'

import '../../src/styles/index.css'
import WoobatUI from '../../src/plugin'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(WoobatUI, {
  theme: 'light',
  registerAllComponents: true,
  ripple: true
})

app.use(router)
app.mount('#app')
