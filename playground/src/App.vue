<template>
  <div id="app" class="app-layout">
    <nav class="sidebar-nav">
      <div class="nav-brand">
        <h1>Woobat</h1>
        <span class="nav-subtitle">Component Playground</span>
      </div>
      <div class="nav-links">
        <router-link 
          v-for="route in routes" 
          :key="route.path"
          :to="route.path" 
          class="nav-link"
          active-class="nav-link--active"
        >
          {{ route.meta?.title || route.name }}
        </router-link>
      </div>
    </nav>
    
    <main class="playground-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import routes from './router/routes'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
  overflow-x: hidden;
}

.app-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.sidebar-nav {
  width: 250px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
}

.nav-brand {
  padding: 0 24px;
  margin-bottom: 32px;
}

.nav-brand h1 {
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
  margin: 0;
}

.nav-subtitle {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  display: block;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
}

.nav-link {
  padding: 12px 16px;
  text-decoration: none;
  color: #64748b;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  background-color: #f1f5f9;
  color: #3b82f6;
}

.nav-link--active {
  background-color: #3b82f6;
  color: white;
}

.playground-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 250px;
}

@media (max-width: 768px) {
  .sidebar-nav {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .playground-main {
    margin-left: 0;
  }
  
  .sidebar-nav.mobile-open {
    transform: translateX(0);
  }
}
</style>
