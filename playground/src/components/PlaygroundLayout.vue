<template>
  <div class="playground-layout">
    <div class="playground-header">
      <h2 class="component-title">{{ title }}</h2>
      <p class="component-description">{{ description }}</p>
    </div>
    
    <div class="playground-content">
      <div class="props-section">
        <div class="props-panel">
          <h3>Interactive Props</h3>
          <div class="props-controls">
            <slot name="controls" />
          </div>
        </div>
        
        <div class="code-section">
          <div class="code-block-container">
            <pre class="code-block"><code>{{ generatedCode }}</code></pre>
            <button @click="copyCode" class="copy-button">
              <Copy :size="16" />
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="preview-panel">
        <h3>Preview</h3>
        <div class="preview-container">
          <slot name="preview" />
        </div>
      </div>
    </div>
    
    <div class="documentation-section">
      <h3>Props Documentation</h3>
      <slot name="documentation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Copy } from 'lucide-vue-next'

interface Props {
  title: string
  description: string
  generatedCode: string
}

const props = defineProps<Props>()
const copied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.generatedCode)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<style scoped>
.playground-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.playground-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  flex-shrink: 0;
}

.component-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.component-description {
  font-size: 14px;
  color: #64748b;
}

.playground-content {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  width: 100%;
}

.props-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-right: 1px solid #e2e8f0;
  min-width: 0;
  overflow-x: hidden;
}

.props-panel {
  padding: 24px;
  flex: 1;
}

.props-panel h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
}

.props-controls {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px 12px;
}

.preview-panel {
  width: 400px;
  display: flex;
  flex-direction: column;
  background: white;
  flex-shrink: 0;
}

.preview-panel h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  padding: 24px 24px 0;
}

.preview-container {
  flex: 1;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  margin: 0 24px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}

.code-section {
  border-top: 1px solid #e2e8f0;
  padding: 16px 24px 24px;
  flex-shrink: 0;
}

.code-block-container {
  position: relative;
  display: flex;
  align-items: center;
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
}

.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 1;
}

.copy-button:hover {
  background: #2563eb;
}

.code-block {
  background: transparent;
  color: #e2e8f0;
  padding: 16px 60px 16px 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  margin: 0;
  flex: 1;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
  max-width: 100%;
}

.documentation-section {
  background: white;
  padding: 24px;
  flex-shrink: 0;
  border-top: 1px solid #e2e8f0;
}

.documentation-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
}

.documentation-section::-webkit-scrollbar {
  width: 6px;
}

.documentation-section::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.documentation-section::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.documentation-section::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}


@media (max-width: 1024px) {
  .props-controls {
    grid-template-columns: 1fr 1fr;
  }
  
  .preview-panel {
    width: 350px;
  }
}

@media (max-width: 768px) {
  .playground-content {
    flex-direction: column;
  }
  
  .props-section {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .props-controls {
    grid-template-columns: 1fr 1fr;
    gap: 12px 8px;
  }
  
  .preview-panel {
    width: 100%;
  }
  
  .preview-container {
    padding: 24px;
    margin: 0 16px;
  }
}
</style>
