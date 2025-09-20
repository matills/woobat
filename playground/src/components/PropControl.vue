<template>
  <div class="prop-control">
    <label class="prop-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    
    <input 
      v-if="type === 'string'"
      v-model="localValue"
      type="text"
      :placeholder="placeholder"
      class="prop-input"
    />
    
    <input 
      v-else-if="type === 'number'"
      v-model.number="localValue"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      class="prop-input"
    />
    
    <label v-else-if="type === 'boolean'" class="toggle-container">
      <input 
        v-model="localValue"
        type="checkbox"
        class="toggle-input"
      />
      <span class="toggle-slider"></span>
    </label>
    
    <select 
      v-else-if="type === 'select'"
      v-model="localValue"
      class="prop-select"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    
    <input 
      v-else-if="type === 'color'"
      v-model="localValue"
      type="color"
      class="prop-color"
    />
    
    <p v-if="description" class="prop-description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  label: string
  value: any
}

interface Props {
  label: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'color'
  modelValue: any
  placeholder?: string
  required?: boolean
  description?: string
  options?: Option[]
  min?: number
  max?: number
  step?: number
}

interface Emits {
  (e: 'update:modelValue', value: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<style scoped>
.prop-control {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.prop-label {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 4px;
}

.required {
  color: #ef4444;
}

.prop-input,
.prop-select {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  transition: border-color 0.2s;
}

.prop-input:focus,
.prop-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.toggle-container {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: 0.2s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.2s;
  border-radius: 50%;
}

.toggle-input:checked + .toggle-slider {
  background-color: #3b82f6;
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.prop-color {
  width: 60px;
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
}

.prop-description {
  font-size: 11px;
  color: #6b7280;
  margin: 0;
  line-height: 1.3;
}
</style>
