/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    WbBtn: typeof import('./src/components/Button/Button.vue')['default']
  }
}

export {}