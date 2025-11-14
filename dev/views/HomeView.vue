<script setup lang="ts">
import { Badge, Avatar, Button, Alert } from '@/components'
import { CheckCircleIcon } from '@/components/Alert/icons'
</script>

<template>
  <div class="home-view">
    <section class="hero">
      <h1>Welcome to Woobat</h1>
      <p class="subtitle">A modern Vue 3 component library with TypeScript support</p>
      
      <div class="features">
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>Customizable</h3>
          <p>Full control over colors, sizes, and styles</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>High Performance</h3>
          <p>Optimized for speed and efficiency</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">📦</div>
          <h3>TypeScript</h3>
          <p>Fully typed for better DX</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>Accessible</h3>
          <p>Built with accessibility in mind</p>
        </div>
      </div>
    </section>

    <section class="components-preview">
      <h2>Component Preview</h2>
      
      <div class="preview-grid">
        <div class="preview-item">
          <h3>Badge</h3>
          <div class="preview-demo">
            <Badge :content="5" color="error">
              <Avatar size="lg" text="BD" color="primary" />
            </Badge>
            <Badge dot pulse color="success">
              <Button>Notifications</Button>
            </Badge>
          </div>
        </div>

        <div class="preview-item">
          <h3>Avatar</h3>
          <div class="preview-demo">
            <Avatar src="https://i.pravatar.cc/150?img=1" size="lg" />
            <Avatar text="JD" color="success" size="lg" />
            <Avatar :icon="CheckCircleIcon" color="info" size="lg" />
          </div>
        </div>

        <div class="preview-item">
          <h3>Button</h3>
          <div class="preview-demo">
            <Button color="primary">Primary</Button>
            <Button variant="outlined" color="success">Outlined</Button>
            <Button variant="tonal" color="warning">Tonal</Button>
          </div>
        </div>

        <div class="preview-item">
          <h3>Alert</h3>
          <div class="preview-demo">
            <Alert type="success" icon>Operation successful!</Alert>
            <Alert variant="outlined" type="info" icon>
              Important information
            </Alert>
          </div>
        </div>
      </div>
    </section>

    <section class="get-started">
      <h2>Get Started</h2>
      <p>Select a component from the navigation to explore all available options and examples.</p>
      
      <div class="quick-links">
        <Button size="lg" color="primary" :elevation="2">
          Documentation
        </Button>
        <Button size="lg" variant="outlined" color="secondary">
          View on GitHub
        </Button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  padding: 2rem 0;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero h1 {
  font-size: 3rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

.components-preview {
  margin-bottom: 4rem;
}

.components-preview h2 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.preview-item {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.preview-item h3 {
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 1rem;
  font-weight: 600;
}

.preview-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.get-started {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.get-started h2 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.get-started p {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.quick-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .preview-grid {
    grid-template-columns: 1fr;
  }

  .get-started {
    padding: 2rem 1rem;
  }
}
</style>