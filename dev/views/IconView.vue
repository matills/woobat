<script setup lang="ts">
import { Icon } from '@/components'
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon } from '@/components/Alert/icons'
import { LoadingIcon } from '@/components/Button/icons'
</script>

<template>
  <div class="icon-view">
    <div class="view-header">
      <h1>Icon Component</h1>
      <p>Display icons from any library with flexible sizing and transformations</p>
    </div>

    <div class="demo-group">
      <h2>Basic Icons (Vue Components)</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" />
          <span>CheckCircle</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="XCircleIcon" />
          <span>XCircle</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" />
          <span>AlertTriangle</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="InfoIcon" />
          <span>Info</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="LoadingIcon" />
          <span>Loading</span>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Icon Sizes</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="xs" color="#10b981" />
          <span>Extra Small (xs)</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="sm" color="#10b981" />
          <span>Small (sm)</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="md" color="#10b981" />
          <span>Medium (md)</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="lg" color="#10b981" />
          <span>Large (lg)</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="xl" color="#10b981" />
          <span>Extra Large (xl)</span>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Sizes</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon :icon="InfoIcon" :size="16" color="#3b82f6" />
          <span>16px (number)</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="InfoIcon" size="24px" color="#3b82f6" />
          <span>24px (string)</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="InfoIcon" size="2rem" color="#3b82f6" />
          <span>2rem (string)</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="InfoIcon" size="3em" color="#3b82f6" />
          <span>3em (string)</span>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Colors</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="lg" color="#10b981" />
          <span>Success Green</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="XCircleIcon" size="lg" color="#ef4444" />
          <span>Error Red</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="lg" color="#f59e0b" />
          <span>Warning Orange</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="InfoIcon" size="lg" color="#3b82f6" />
          <span>Info Blue</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="lg" color="#8b5cf6" />
          <span>Custom Purple</span>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Rotation (45° increments)</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="lg" :rotation="0" color="#f59e0b" />
          <span>0°</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="lg" :rotation="45" color="#f59e0b" />
          <span>45°</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="lg" :rotation="90" color="#f59e0b" />
          <span>90°</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="lg" :rotation="135" color="#f59e0b" />
          <span>135°</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="lg" :rotation="180" color="#f59e0b" />
          <span>180°</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="lg" :rotation="225" color="#f59e0b" />
          <span>225°</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="lg" :rotation="270" color="#f59e0b" />
          <span>270°</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="lg" :rotation="315" color="#f59e0b" />
          <span>315°</span>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Flip Transformations</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="xl" flip="none" color="#3b82f6" />
          <span>Normal (none)</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="xl" flip="horizontal" color="#3b82f6" />
          <span>Horizontal</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="xl" flip="vertical" color="#3b82f6" />
          <span>Vertical</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="xl" flip="both" color="#3b82f6" />
          <span>Both</span>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Animations</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon :icon="LoadingIcon" size="xl" spin color="#3b82f6" />
          <span>Spin Animation</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="InfoIcon" size="xl" pulse color="#f59e0b" />
          <span>Pulse Animation</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="xl" spin pulse color="#10b981" />
          <span>Spin + Pulse</span>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Combined Transformations</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="xl" :rotation="45" flip="horizontal" color="#ef4444" />
          <span>Rotate 45° + Flip H</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="AlertTriangleIcon" size="xl" :rotation="90" flip="vertical" color="#8b5cf6" />
          <span>Rotate 90° + Flip V</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="xl" :rotation="180" flip="both" color="#10b981" />
          <span>Rotate 180° + Flip Both</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="LoadingIcon" size="xl" :rotation="270" spin color="#3b82f6" />
          <span>Rotate 270° + Spin</span>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Font Icon Support (String Classes)</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon icon="fa fa-home" size="lg" color="#3b82f6" />
          <span>FontAwesome</span>
        </div>
        <div class="icon-demo">
          <Icon icon="material-icons" size="lg" color="#10b981">home</Icon>
          <span>Material Icons</span>
        </div>
        <div class="icon-demo">
          <Icon icon="bi bi-house" size="lg" color="#f59e0b" />
          <span>Bootstrap Icons</span>
        </div>
      </div>
      <p class="note">
        Note: Font icon libraries need to be included in your project separately
      </p>
    </div>

    <div class="demo-group">
      <h2>Disabled State</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon :icon="CheckCircleIcon" size="lg" color="#10b981" disabled />
          <span>Disabled Icon</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="XCircleIcon" size="lg" color="#ef4444" disabled />
          <span>Disabled Icon</span>
        </div>
        <div class="icon-demo">
          <Icon :icon="InfoIcon" size="lg" color="#3b82f6" disabled />
          <span>Disabled Icon</span>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Clickable Icons</h2>
      <div class="demo-row">
        <div class="icon-demo">
          <Icon 
            :icon="CheckCircleIcon" 
            size="xl" 
            color="#10b981" 
            style="cursor: pointer;"
            @click="handleIconClick('Success')"
          />
          <span>Click me!</span>
        </div>
        <div class="icon-demo">
          <Icon 
            :icon="XCircleIcon" 
            size="xl" 
            color="#ef4444" 
            style="cursor: pointer;"
            @click="handleIconClick('Error')"
          />
          <span>Click me!</span>
        </div>
        <div class="icon-demo">
          <Icon 
            :icon="InfoIcon" 
            size="xl" 
            color="#3b82f6" 
            style="cursor: pointer;"
            @click="handleIconClick('Info')"
          />
          <span>Click me!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    handleIconClick(type: string) {
      alert(`${type} icon clicked!`)
    }
  }
}
</script>

<style scoped>
.icon-view {
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
  gap: 2rem;
  align-items: flex-start;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.icon-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
}

.icon-demo span {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

.note {
  margin-top: 1rem;
  padding: 1rem;
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
  color: #92400e;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}

.example-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.example-card:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.example-content {
  flex: 1;
}

.example-content h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.example-content p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 768px) {
  .view-header h1 {
    font-size: 2rem;
  }

  .demo-group {
    padding: 1.5rem;
  }

  .demo-row {
    gap: 1rem;
  }

  .icon-demo {
    min-width: 80px;
  }

  .example-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>