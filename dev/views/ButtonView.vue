<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components'
import { CheckCircleIcon, InfoIcon } from '@/components/Alert/icons'

const clickCount = ref(0)
const loadingButton = ref(false)

const handleClick = () => {
  clickCount.value++
}

const handleLoadingClick = () => {
  loadingButton.value = true
  setTimeout(() => {
    loadingButton.value = false
  }, 2000)
}

const handleZoneClick = (zone: string) => {
  alert(`Clicked zone: ${zone}`)
}
</script>

<template>
  <div class="button-view">
    <div class="view-header">
      <h1>Button Component</h1>
      <p>Trigger actions and events with customizable button styles</p>
    </div>

    <div class="demo-group">
      <h2>Variants</h2>
      <div class="demo-row">
        <Button>Filled (Default)</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <Button variant="elevated">Elevated</Button>
        <Button variant="tonal">Tonal</Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Colors</h2>
      <div class="demo-row">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="error">Error</Button>
        <Button color="warning">Warning</Button>
        <Button color="info">Info</Button>
        <Button customColor="#8b5cf6">Custom Purple</Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Sizes</h2>
      <div class="demo-row">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>With Icons</h2>
      <div class="demo-row">
        <Button :icon-left="CheckCircleIcon">Left Icon</Button>
        <Button :icon-right="InfoIcon">Right Icon</Button>
        <Button :icon-left="CheckCircleIcon" :icon-right="InfoIcon">Both Icons</Button>
        <Button :icon-left="CheckCircleIcon" icon-only />
        <Button :icon-right="InfoIcon" icon-only size="lg" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Loading States</h2>
      <div class="demo-row">
        <Button :loading="loadingButton" @click="handleLoadingClick">
          Click to Load
        </Button>
        <Button loading show-loading-text>Loading...</Button>
        <Button loading preserve-text>Saving Data</Button>
        <Button :icon-left="CheckCircleIcon" loading>With Icon</Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Rounded Variants</h2>
      <div class="demo-row">
        <Button rounded="none">No Radius</Button>
        <Button rounded="sm">Small</Button>
        <Button rounded="md">Medium</Button>
        <Button rounded="lg">Large</Button>
        <Button rounded="xl">Extra Large</Button>
        <Button rounded="full">Full Rounded</Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Elevations</h2>
      <div class="demo-row">
        <Button :elevation="0">No Shadow</Button>
        <Button :elevation="1">Elevation 1</Button>
        <Button :elevation="2">Elevation 2</Button>
        <Button :elevation="3">Elevation 3</Button>
        <Button :elevation="4">Elevation 4</Button>
        <Button :elevation="5">Elevation 5</Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Block & Disabled</h2>
      <div class="demo-column">
        <Button block>Full Width Button</Button>
        <Button block variant="outlined" color="success">
          Block Outlined Button
        </Button>
        <Button disabled>Disabled Button</Button>
        <Button variant="outlined" disabled>Disabled Outlined</Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Ripple Effect</h2>
      <div class="demo-row">
        <Button>Default Ripple</Button>
        <Button color="success">Success with Ripple</Button>
        <Button variant="outlined" color="error">Outlined Ripple</Button>
        <Button variant="tonal" color="warning">Tonal Ripple</Button>
        <Button :ripple="false">Ripple Disabled</Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Click Animations</h2>
      <div class="demo-row">
        <Button @click="handleClick">
          Clicked {{ clickCount }} times
        </Button>
        <Button click-animation="scale">Scale</Button>
        <Button click-animation="shake">Shake</Button>
        <Button click-animation="pulse">Pulse</Button>
        <Button click-animation="bounce">Bounce</Button>
        <Button click-animation="none">No Animation</Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Styling</h2>
      <div class="demo-row">
        <Button 
          customColor="#ec4899" 
          textColor="#fff"
          rounded="full"
          :elevation="3"
        >
          Custom Pink
        </Button>
        <Button 
          variant="outlined" 
          customColor="#10b981"
          borderColor="#059669"
          textColor="#059669"
          padding="1rem 2rem"
        >
          Custom Outlined
        </Button>
        <Button 
          variant="tonal"
          customColor="#f59e0b"
        >
          Custom Tonal
        </Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Combined Styles</h2>
      <div class="demo-row">
        <Button 
          :icon-left="CheckCircleIcon"
          variant="elevated"
          color="success"
          size="lg"
          rounded="full"
        >
          Success Action
        </Button>
        <Button 
          :icon-right="InfoIcon"
          variant="outlined"
          color="info"
          size="lg"
          :elevation="2"
        >
          Learn More
        </Button>
        <Button 
          variant="tonal"
          color="warning"
          :icon-left="CheckCircleIcon"
          size="xl"
          rounded="lg"
        >
          Large Tonal
        </Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Click Zones (Advanced)</h2>
      <div class="demo-row">
        <Button 
          detect-quadrant
          @zone-click="handleZoneClick"
          color="info"
          size="lg"
        >
          Click Different Areas
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-view {
  padding-bottom: 3rem;
}

.view-header {
  margin-bottom: 3rem;
  text-align: center;
}

.view-header h1 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.view-header p {
  font-size: 1.125rem;
  color: #6b7280;
}

.demo-group {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.demo-group h2 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 768px) {
  .view-header h1 {
    font-size: 2rem;
  }

  .demo-group {
    padding: 1.5rem;
  }
}
</style>