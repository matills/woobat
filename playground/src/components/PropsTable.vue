<template>
  <div class="props-table">
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in props" :key="prop.name">
          <td class="prop-name">
            {{ prop.name }}
            <span v-if="prop.required" class="required">*</span>
          </td>
          <td class="prop-type">
            <code>{{ prop.type }}</code>
          </td>
          <td class="prop-default">
            <code v-if="prop.default !== undefined">{{ formatDefault(prop.default) }}</code>
            <span v-else class="no-default">-</span>
          </td>
          <td class="prop-description">{{ prop.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface PropInfo {
  name: string
  type: string
  default?: any
  required?: boolean
  description: string
}

interface Props {
  props: PropInfo[]
}

defineProps<Props>()

const formatDefault = (value: any): string => {
  if (typeof value === 'string') {
    return `"${value}"`
  }
  if (typeof value === 'boolean') {
    return value.toString()
  }
  if (value === null) {
    return 'null'
  }
  if (value === undefined) {
    return 'undefined'
  }
  return JSON.stringify(value)
}
</script>

<style scoped>
.props-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #374151;
}

.prop-name {
  font-weight: 500;
  color: #1e293b;
}

.required {
  color: #ef4444;
  margin-left: 4px;
}

.prop-type code,
.prop-default code {
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: #3b82f6;
}

.no-default {
  color: #9ca3af;
  font-style: italic;
}

.prop-description {
  color: #6b7280;
  line-height: 1.5;
}

tr:hover {
  background-color: #f8fafc;
}
</style>
