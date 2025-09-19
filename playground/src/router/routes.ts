import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/button'
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import('../views/ButtonPlayground.vue'),
    meta: {
      title: 'Button'
    }
  }
]

export default routes
