<script setup lang="ts">
import { Chip } from '@/components'
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon } from '@/components/Alert/icons'
import { ref } from 'vue'

const chips = ref([
  { id: 1, label: 'Design', visible: true },
  { id: 2, label: 'Development', visible: true },
  { id: 3, label: 'Marketing', visible: true },
  { id: 4, label: 'Success Task', visible: true },
  { id: 5, label: 'Error Report', visible: true },
  { id: 6, label: 'Warning Notice', visible: true },
  { id: 7, label: 'Info Alert', visible: true },
  { id: 8, label: 'Drag & Drop', visible: true }
])

const handleClose = (id: number) => {
  const chip = chips.value.find(c => c.id === id)
  if (chip) chip.visible = false
}

const handleDragStart = (event: DragEvent, label: string) => {
  event.dataTransfer!.effectAllowed = 'move'
  event.dataTransfer!.setData('text/plain', label)
}
</script>

<template>
  <div class="chip-view">
    <div class="view-header">
      <h1>Chip Component</h1>
      <p>Compact elements that represent inputs, attributes, or actions</p>
    </div>

    <div class="demo-group">
      <h2>Variant: Filled</h2>
      <div class="demo-row">
        <Chip label="Default Chip" />
        <Chip label="Primary" color="#3b82f6" />
        <Chip label="Success" color="#10b981" />
        <Chip label="Error" color="#ef4444" />
        <Chip label="Warning" color="#f59e0b" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Variant: Outlined</h2>
      <div class="demo-row">
        <Chip variant="outlined" label="Default Chip" />
        <Chip variant="outlined" label="Primary" color="#3b82f6" />
        <Chip variant="outlined" label="Success" color="#10b981" />
        <Chip variant="outlined" label="Error" color="#ef4444" />
        <Chip variant="outlined" label="Warning" color="#f59e0b" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Variant: Tonal</h2>
      <div class="demo-row">
        <Chip variant="tonal" label="Default Chip" />
        <Chip variant="tonal" label="Primary" color="#3b82f6" />
        <Chip variant="tonal" label="Success" color="#10b981" />
        <Chip variant="tonal" label="Error" color="#ef4444" />
        <Chip variant="tonal" label="Warning" color="#f59e0b" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Variant: Text</h2>
      <div class="demo-row">
        <Chip variant="text" label="Default Chip" />
        <Chip variant="text" label="Primary" color="#3b82f6" />
        <Chip variant="text" label="Success" color="#10b981" />
        <Chip variant="text" label="Error" color="#ef4444" />
        <Chip variant="text" label="Warning" color="#f59e0b" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Sizes</h2>
      <div class="demo-row">
        <Chip label="Extra Small" size="xs" color="#3b82f6" />
        <Chip label="Small" size="sm" color="#3b82f6" />
        <Chip label="Medium" size="md" color="#3b82f6" />
        <Chip label="Large" size="lg" color="#3b82f6" />
        <Chip label="Extra Large" size="xl" color="#3b82f6" />
      </div>
    </div>

    <div class="demo-group">
      <h2>With Icons Left</h2>
      <div class="demo-row">
        <Chip label="Success" color="#10b981" :icon-left="CheckCircleIcon" />
        <Chip label="Error" color="#ef4444" :icon-left="XCircleIcon" />
        <Chip label="Warning" color="#f59e0b" :icon-left="AlertTriangleIcon" />
        <Chip label="Info" color="#3b82f6" :icon-left="InfoIcon" />
      </div>
    </div>

    <div class="demo-group">
      <h2>With Icons Right</h2>
      <div class="demo-row">
        <Chip variant="outlined" label="Success" color="#10b981" :icon-right="CheckCircleIcon" />
        <Chip variant="outlined" label="Error" color="#ef4444" :icon-right="XCircleIcon" />
        <Chip variant="outlined" label="Warning" color="#f59e0b" :icon-right="AlertTriangleIcon" />
        <Chip variant="outlined" label="Info" color="#3b82f6" :icon-right="InfoIcon" />
      </div>
    </div>

    <div class="demo-group">
      <h2>With Both Icons</h2>
      <div class="demo-row">
        <Chip 
          variant="tonal" 
          label="Complete" 
          color="#10b981" 
          :icon-left="CheckCircleIcon" 
          :icon-right="CheckCircleIcon" 
        />
        <Chip 
          variant="tonal" 
          label="Alert" 
          color="#f59e0b" 
          :icon-left="AlertTriangleIcon" 
          :icon-right="AlertTriangleIcon" 
        />
        <Chip 
          variant="tonal" 
          label="Information" 
          color="#3b82f6" 
          :icon-left="InfoIcon" 
          :icon-right="InfoIcon" 
        />
      </div>
    </div>

    <div class="demo-group">
      <h2>Closable Chips</h2>
      <div class="demo-row">
        <Chip 
          v-if="chips.find(c => c.id === 1)?.visible"
          label="Design" 
          color="#3b82f6"
          closable
          @close="handleClose(1)"
        />
        <Chip 
          v-if="chips.find(c => c.id === 2)?.visible"
          label="Development" 
          color="#3b82f6"
          closable
          @close="handleClose(2)"
        />
        <Chip 
          v-if="chips.find(c => c.id === 3)?.visible"
          label="Marketing" 
          color="#3b82f6"
          closable
          @close="handleClose(3)"
        />
      </div>
      <p class="demo-note">Click the X to remove chips (they will disappear)</p>
    </div>

    <div class="demo-group">
      <h2>Closable with Icons</h2>
      <div class="demo-row">
        <Chip 
          v-if="chips.find(c => c.id === 4)?.visible"
          label="Success Task" 
          color="#10b981" 
          :icon-left="CheckCircleIcon"
          closable
          @close="handleClose(4)"
        />
        <Chip 
          v-if="chips.find(c => c.id === 5)?.visible"
          label="Error Report" 
          color="#ef4444" 
          :icon-left="XCircleIcon"
          closable
          @close="handleClose(5)"
        />
        <Chip 
          v-if="chips.find(c => c.id === 6)?.visible"
          label="Warning Notice" 
          color="#f59e0b" 
          :icon-left="AlertTriangleIcon"
          closable
          @close="handleClose(6)"
        />
        <Chip 
          v-if="chips.find(c => c.id === 7)?.visible"
          label="Info Alert" 
          color="#3b82f6" 
          :icon-left="InfoIcon"
          closable
          @close="handleClose(7)"
        />
      </div>
    </div>

    <div class="demo-group">
      <h2>Square Chips</h2>
      <div class="demo-row">
        <Chip label="Square Default" square />
        <Chip label="Square Primary" color="#3b82f6" square />
        <Chip label="Square Success" color="#10b981" square />
        <Chip label="Square Error" color="#ef4444" square />
      </div>
    </div>

    <div class="demo-group">
      <h2>Border Radius Options</h2>
      <div class="demo-row">
        <Chip label="None" color="#3b82f6" rounded="none" />
        <Chip label="Small" color="#3b82f6" rounded="sm" />
        <Chip label="Medium" color="#3b82f6" rounded="md" />
        <Chip label="Large" color="#3b82f6" rounded="lg" />
        <Chip label="XL" color="#3b82f6" rounded="xl" />
        <Chip label="Full" color="#3b82f6" rounded="full" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Draggable Chips</h2>
      <div class="demo-row">
        <Chip 
          label="Drag Me" 
          color="#8b5cf6" 
          draggable
          @dragstart="handleDragStart($event, 'Drag Me')"
        />
        <Chip 
          label="I'm Draggable" 
          color="#ec4899" 
          draggable
          :icon-left="InfoIcon"
          @dragstart="handleDragStart($event, 'I\'m Draggable')"
        />
        <Chip 
          v-if="chips.find(c => c.id === 8)?.visible"
          label="Drag & Drop" 
          color="#10b981" 
          draggable
          closable
          @close="handleClose(8)"
          @dragstart="handleDragStart($event, 'Drag & Drop')"
        />
      </div>
      <p class="demo-note">These chips can be dragged, and the last one can also be closed</p>
    </div>

    <div class="demo-group">
      <h2>Custom Colors</h2>
      <div class="demo-row">
        <Chip label="Purple" color="#8b5cf6" />
        <Chip label="Pink" color="#ec4899" />
        <Chip label="Indigo" color="#6366f1" />
        <Chip label="Teal" color="#14b8a6" />
        <Chip label="Orange" color="#f97316" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Text Colors</h2>
      <div class="demo-row">
        <Chip 
          variant="outlined" 
          label="Custom Text" 
          color="#8b5cf6" 
          text-color="#6d28d9"
        />
        <Chip 
          variant="tonal" 
          label="Dark Text" 
          color="#10b981" 
          text-color="#065f46"
        />
        <Chip 
          variant="outlined" 
          label="Light Background" 
          color="#fbbf24" 
          text-color="#92400e"
        />
      </div>
    </div>

    <div class="demo-group">
      <h2>Disabled State</h2>
      <div class="demo-row">
        <Chip label="Disabled" disabled />
        <Chip label="Disabled Primary" color="#3b82f6" disabled />
        <Chip variant="outlined" label="Disabled Outlined" color="#10b981" disabled />
        <Chip variant="tonal" label="Disabled Tonal" color="#ef4444" disabled closable />
      </div>
    </div>

    <div class="demo-group">
      <h2>Complex Examples</h2>
      <div class="demo-column">
        <div class="demo-row">
          <Chip 
            label="Team Member" 
            color="#3b82f6" 
            :icon-left="CheckCircleIcon"
            closable
            size="lg"
          />
          <Chip 
            label="Administrator" 
            color="#8b5cf6" 
            :icon-left="CheckCircleIcon"
            size="lg"
          />
          <Chip 
            label="Guest" 
            color="#6b7280" 
            size="lg"
          />
        </div>

        <div class="demo-row">
          <Chip 
            variant="outlined" 
            label="JavaScript" 
            color="#f59e0b"
            size="sm"
          />
          <Chip 
            variant="outlined" 
            label="TypeScript" 
            color="#3b82f6"
            size="sm"
          />
          <Chip 
            variant="outlined" 
            label="Vue.js" 
            color="#10b981"
            size="sm"
          />
          <Chip 
            variant="outlined" 
            label="React" 
            color="#06b6d4"
            size="sm"
          />
        </div>

        <div class="demo-row">
          <Chip 
            variant="tonal" 
            label="In Progress" 
            color="#3b82f6"
            :icon-left="InfoIcon"
            draggable
          />
          <Chip 
            variant="tonal" 
            label="Completed" 
            color="#10b981"
            :icon-left="CheckCircleIcon"
            draggable
          />
          <Chip 
            variant="tonal" 
            label="Failed" 
            color="#ef4444"
            :icon-left="XCircleIcon"
            draggable
          />
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Mixed Variants & Sizes</h2>
      <div class="demo-row">
        <Chip label="XS Filled" size="xs" color="#3b82f6" />
        <Chip variant="outlined" label="SM Outlined" size="sm" color="#10b981" />
        <Chip variant="tonal" label="MD Tonal" size="md" color="#f59e0b" />
        <Chip variant="text" label="LG Text" size="lg" color="#ef4444" />
        <Chip 
          v-if="chips.find(c => c.id === 9)?.visible"
          label="XL Filled" 
          size="xl" 
          color="#8b5cf6" 
          closable 
          @close="handleClose(9)"
        />
      </div>
    </div>

    <div class="demo-group">
      <h2>Slot Content</h2>
      <div class="demo-row">
        <Chip color="#3b82f6">
          <strong>Bold</strong> Content
        </Chip>
        <Chip variant="outlined" color="#10b981">
          <em>Italic</em> Text
        </Chip>
        <Chip variant="tonal" color="#f59e0b">
          Custom <span style="text-decoration: underline;">Styled</span> Text
        </Chip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chip-view {
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
  gap: 0.75rem;
  align-items: center;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-note {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
}

@media (max-width: 768px) {
  .view-header h1 {
    font-size: 2rem;
  }

  .demo-group {
    padding: 1.5rem;
  }

  .demo-row {
    gap: 0.5rem;
  }
}
</style>