<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

type View = 'home' | 'badge' | 'avatar' | 'button' | 'alert' | 'chip' | 'icon' | 'checkbox'
const currentView = ref<View>('home')

const getComponent = (view: View) =>
  defineAsyncComponent(() => import(`./views/${view.charAt(0).toUpperCase() + view.slice(1)}View.vue`))
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <h1>Woobat Component Library</h1>
        <p>Vue 3 Component Library</p>
      </div>
    </header>

    <nav class="app-nav">
      <button :class="{ active: currentView === 'home' }" @click="currentView = 'home'">Home</button>
      <button :class="{ active: currentView === 'badge' }" @click="currentView = 'badge'">Badge</button>
      <button :class="{ active: currentView === 'avatar' }" @click="currentView = 'avatar'">Avatar</button>
      <button :class="{ active: currentView === 'alert' }" @click="currentView = 'alert'">Alert</button>
      <button :class="{ active: currentView === 'button' }" @click="currentView = 'button'">Button</button>
      <button :class="{ active: currentView === 'chip' }" @click="currentView = 'chip'">Chip</button>
      <button :class="{ active: currentView === 'icon' }" @click="currentView = 'icon'">Icon</button>
      <button :class="{ active: currentView === 'checkbox' }" @click="currentView = 'checkbox'">Checkbox</button>
    </nav>
    
    <main class="app-main">
      <transition name="fade" mode="out-in">
        <component :is="getComponent(currentView)" />
      </transition>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: #f9fafb;
}

.app-header {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.app-header p {
  font-size: 1.125rem;
  opacity: 0.9;
}

.app-nav {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.app-nav button {
  padding: 0.625rem 1.25rem;
  background: white;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9375rem;
}

.app-nav button:hover {
  background: #f3f4f6;
  border-color: #3b82f6;
  color: #3b82f6;
}

.app-nav button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.app-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1.5rem 1rem;
  }

  .app-header h1 {
    font-size: 1.75rem;
  }

  .app-nav {
    padding: 1rem;
  }

  .app-main {
    padding: 1rem;
  }
}
</style>