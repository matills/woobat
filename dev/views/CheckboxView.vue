<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components'

const singleCheckbox = ref(false)
const agreedToTerms = ref(false)
const enableNotifications = ref(true)
const customValueCheckbox = ref('no')

const selectedFruits = ref<string[]>(['apple'])
const selectedColors = ref<string[]>([])
const selectedHobbies = ref<string[]>(['reading', 'coding'])

const checkboxWithError = ref(false)
const indeterminateCheckbox = ref(false)
const parentCheckbox = ref(false)
const childCheckboxes = ref({
  option1: false,
  option2: false,
  option3: false
})

const updateParentCheckbox = () => {
  const values = Object.values(childCheckboxes.value)
  const allChecked = values.every(v => v)
  const someChecked = values.some(v => v)
  
  parentCheckbox.value = allChecked
  indeterminateCheckbox.value = someChecked && !allChecked
}

const handleParentChange = (value: boolean | unknown[]) => {
  const checked = value as boolean
  childCheckboxes.value.option1 = checked
  childCheckboxes.value.option2 = checked
  childCheckboxes.value.option3 = checked
  indeterminateCheckbox.value = false
}

const handleChildChange = () => {
  updateParentCheckbox()
}
</script>

<template>
  <div class="checkbox-view">
    <div class="view-header">
      <h1>Checkbox Component</h1>
      <p>Versatile checkbox component with support for groups, validation, and indeterminate states</p>
    </div>

    <div class="demo-group">
      <h2>Basic Checkboxes</h2>
      <div class="demo-column">
        <Checkbox v-model="singleCheckbox" label="Simple checkbox" />
        <Checkbox v-model="agreedToTerms" label="I agree to the terms and conditions" />
        <Checkbox v-model="enableNotifications" label="Enable notifications" />
        <div class="state-display">
          <span>States:</span>
          <code>singleCheckbox: {{ singleCheckbox }}</code>
          <code>agreedToTerms: {{ agreedToTerms }}</code>
          <code>enableNotifications: {{ enableNotifications }}</code>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Values (trueValue / falseValue)</h2>
      <div class="demo-column">
        <Checkbox 
          v-model="customValueCheckbox" 
          label="Accept marketing emails" 
          true-value="yes"
          false-value="no"
        />
        <div class="state-display">
          <span>Current value:</span>
          <code>customValueCheckbox: "{{ customValueCheckbox }}"</code>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Checkbox with Slot Content</h2>
      <div class="demo-column">
        <Checkbox v-model="singleCheckbox">
          <span style="font-weight: 600;">Custom Label</span> with 
          <span style="color: #3b82f6;">styled content</span>
        </Checkbox>
        <Checkbox v-model="agreedToTerms">
          I accept the 
          <a href="#" style="color: #3b82f6; text-decoration: underline;">terms</a> 
          and 
          <a href="#" style="color: #3b82f6; text-decoration: underline;">privacy policy</a>
        </Checkbox>
      </div>
    </div>

    <div class="demo-group">
      <h2>Colors</h2>
      <div class="demo-row">
        <Checkbox v-model="singleCheckbox" label="Primary" color="primary" />
        <Checkbox v-model="singleCheckbox" label="Secondary" color="secondary" />
        <Checkbox v-model="singleCheckbox" label="Success" color="success" />
        <Checkbox v-model="singleCheckbox" label="Error" color="error" />
        <Checkbox v-model="singleCheckbox" label="Warning" color="warning" />
        <Checkbox v-model="singleCheckbox" label="Info" color="info" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Colors</h2>
      <div class="demo-row">
        <Checkbox v-model="singleCheckbox" label="Purple" custom-color="#8b5cf6" />
        <Checkbox v-model="singleCheckbox" label="Pink" custom-color="#ec4899" />
        <Checkbox v-model="singleCheckbox" label="Teal" custom-color="#14b8a6" />
        <Checkbox v-model="singleCheckbox" label="Orange" custom-color="#f97316" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Indeterminate State</h2>
      <div class="demo-column">
        <Checkbox 
          v-model="parentCheckbox" 
          :indeterminate="indeterminateCheckbox"
          label="Select all options"
          color="primary"
          @change="handleParentChange"
        />
        <div style="margin-left: 2rem; display: flex; flex-direction: column; gap: 0.75rem;">
          <Checkbox 
            v-model="childCheckboxes.option1" 
            label="Option 1"
            color="primary"
            @change="handleChildChange"
          />
          <Checkbox 
            v-model="childCheckboxes.option2" 
            label="Option 2"
            color="primary"
            @change="handleChildChange"
          />
          <Checkbox 
            v-model="childCheckboxes.option3" 
            label="Option 3"
            color="primary"
            @change="handleChildChange"
          />
        </div>
        <div class="state-display">
          <span>States:</span>
          <code>parent: {{ parentCheckbox }}, indeterminate: {{ indeterminateCheckbox }}</code>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Grouped Checkboxes (Array)</h2>
      <div class="demo-section">
        <h3>Select your favorite fruits:</h3>
        <div class="demo-column">
          <Checkbox v-model="selectedFruits" value="apple" label="Apple" color="error" />
          <Checkbox v-model="selectedFruits" value="banana" label="Banana" color="warning" />
          <Checkbox v-model="selectedFruits" value="orange" label="Orange" color="warning" />
          <Checkbox v-model="selectedFruits" value="grape" label="Grape" color="secondary" />
          <Checkbox v-model="selectedFruits" value="strawberry" label="Strawberry" color="error" />
        </div>
        <div class="state-display">
          <span>Selected fruits:</span>
          <code>{{ selectedFruits.length ? selectedFruits.join(', ') : 'None' }}</code>
        </div>
      </div>

      <div class="demo-section">
        <h3>Choose your favorite colors:</h3>
        <div class="demo-row">
          <Checkbox v-model="selectedColors" value="red" label="Red" custom-color="#ef4444" />
          <Checkbox v-model="selectedColors" value="blue" label="Blue" custom-color="#3b82f6" />
          <Checkbox v-model="selectedColors" value="green" label="Green" custom-color="#10b981" />
          <Checkbox v-model="selectedColors" value="yellow" label="Yellow" custom-color="#f59e0b" />
          <Checkbox v-model="selectedColors" value="purple" label="Purple" custom-color="#8b5cf6" />
          <Checkbox v-model="selectedColors" value="pink" label="Pink" custom-color="#ec4899" />
        </div>
        <div class="state-display">
          <span>Selected colors:</span>
          <code>{{ selectedColors.length ? selectedColors.join(', ') : 'None' }}</code>
        </div>
      </div>

      <div class="demo-section">
        <h3>Your hobbies:</h3>
        <div class="demo-column">
          <Checkbox v-model="selectedHobbies" value="reading" label="Reading" color="info" />
          <Checkbox v-model="selectedHobbies" value="gaming" label="Gaming" color="primary" />
          <Checkbox v-model="selectedHobbies" value="coding" label="Coding" color="success" />
          <Checkbox v-model="selectedHobbies" value="sports" label="Sports" color="warning" />
          <Checkbox v-model="selectedHobbies" value="music" label="Music" color="secondary" />
        </div>
        <div class="state-display">
          <span>Selected hobbies:</span>
          <code>{{ selectedHobbies.length ? selectedHobbies.join(', ') : 'None' }}</code>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Error State & Validation</h2>
      <div class="demo-column">
        <Checkbox 
          v-model="checkboxWithError" 
          label="I agree to the terms and conditions" 
          :error="!checkboxWithError"
          error-message="You must accept the terms to continue"
          color="primary"
        />
        <Checkbox 
          v-model="agreedToTerms" 
          label="Subscribe to newsletter" 
          :error="false"
          error-message="This error won't show"
          color="success"
        />
        <Checkbox 
          v-model="singleCheckbox" 
          label="Enable two-factor authentication" 
          :error="true"
          error-message="2FA is required for this account"
          color="primary"
        />
        <div class="state-display">
          <span>States:</span>
          <code>checkboxWithError: {{ checkboxWithError }}</code>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Disabled State</h2>
      <div class="demo-column">
        <Checkbox :model-value="false" label="Disabled unchecked" disabled />
        <Checkbox :model-value="true" label="Disabled checked" disabled color="success" />
        <Checkbox :model-value="true" label="Disabled with custom color" disabled custom-color="#8b5cf6" />
        <Checkbox 
          :model-value="false" 
          label="Disabled with error" 
          disabled 
          error 
          error-message="This is disabled"
        />
      </div>
    </div>

    <div class="demo-group">
      <h2>Form Example</h2>
      <div class="form-example">
        <h3>User Preferences</h3>
        <div class="form-section">
          <h4>Notifications</h4>
          <Checkbox v-model="enableNotifications" label="Enable email notifications" color="primary" />
          <Checkbox 
            :model-value="false" 
            label="Enable push notifications" 
            color="primary"
            disabled
          />
          <Checkbox v-model="singleCheckbox" label="Enable SMS notifications" color="primary" />
        </div>
        
        <div class="form-section">
          <h4>Privacy Settings</h4>
          <Checkbox 
            v-model="agreedToTerms" 
            color="primary"
            :error="!agreedToTerms"
            error-message="Required field"
          >
            I agree to the <a href="#" style="color: #3b82f6;">terms of service</a>
          </Checkbox>
          <Checkbox 
            v-model="customValueCheckbox"
            true-value="yes"
            false-value="no"
            label="Allow cookies for analytics"
            color="primary"
          />
        </div>

        <div class="state-display">
          <span>Form data:</span>
          <code>{{ { 
            enableNotifications, 
            agreedToTerms, 
            customValueCheckbox 
          } }}</code>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Real-world Use Cases</h2>
      
      <div class="example-card">
        <div class="example-content">
          <h3>Task List</h3>
          <div class="demo-column">
            <Checkbox v-model="selectedHobbies" value="task1" label="Complete project documentation" color="success" />
            <Checkbox v-model="selectedHobbies" value="task2" label="Review pull requests" color="success" />
            <Checkbox v-model="selectedHobbies" value="task3" label="Update dependencies" color="success" />
            <Checkbox v-model="selectedHobbies" value="task4" label="Write unit tests" color="success" />
          </div>
        </div>
      </div>

      <div class="example-card">
        <div class="example-content">
          <h3>Shopping Cart</h3>
          <div class="demo-column">
            <Checkbox v-model="selectedFruits" value="item1" color="primary">
              <span style="font-weight: 600;">Wireless Mouse</span> - $29.99
            </Checkbox>
            <Checkbox v-model="selectedFruits" value="item2" color="primary">
              <span style="font-weight: 600;">USB-C Cable</span> - $12.99
            </Checkbox>
            <Checkbox v-model="selectedFruits" value="item3" color="primary">
              <span style="font-weight: 600;">Laptop Stand</span> - $49.99
            </Checkbox>
          </div>
        </div>
      </div>

      <div class="example-card">
        <div class="example-content">
          <h3>Permissions Manager</h3>
          <div class="demo-column">
            <Checkbox v-model="selectedColors" value="read" label="Read access" color="info" />
            <Checkbox v-model="selectedColors" value="write" label="Write access" color="warning" />
            <Checkbox v-model="selectedColors" value="delete" label="Delete access" color="error" />
            <Checkbox v-model="selectedColors" value="admin" label="Admin access" color="secondary" />
          </div>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>API Reference</h2>
      <div class="api-table">
        <h3>Props</h3>
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
            <tr>
              <td><code>modelValue</code></td>
              <td><code>boolean | unknown[]</code></td>
              <td><code>false</code></td>
              <td>The v-model value, can be boolean or array for grouped checkboxes</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>unknown</code></td>
              <td><code>undefined</code></td>
              <td>Value to use when in array mode (grouped checkboxes)</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Label text for the checkbox</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>ColorVariant</code></td>
              <td><code>'primary'</code></td>
              <td>Color theme: primary, secondary, success, error, warning, info</td>
            </tr>
            <tr>
              <td><code>customColor</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Custom color value (hex, rgb, etc.)</td>
            </tr>
            <tr>
              <td><code>indeterminate</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Shows minus icon for indeterminate state</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Shows error state styling</td>
            </tr>
            <tr>
              <td><code>errorMessage</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Error message to display below checkbox</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disables the checkbox</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Name attribute for the input element</td>
            </tr>
            <tr>
              <td><code>trueValue</code></td>
              <td><code>unknown</code></td>
              <td><code>true</code></td>
              <td>Value when checked (single checkbox mode)</td>
            </tr>
            <tr>
              <td><code>falseValue</code></td>
              <td><code>unknown</code></td>
              <td><code>false</code></td>
              <td>Value when unchecked (single checkbox mode)</td>
            </tr>
          </tbody>
        </table>

        <h3>Events</h3>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Payload</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>update:modelValue</code></td>
              <td><code>boolean | unknown[]</code></td>
              <td>Emitted when checkbox value changes</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td><code>boolean | unknown[]</code></td>
              <td>Emitted when checkbox value changes</td>
            </tr>
          </tbody>
        </table>

        <h3>Slots</h3>
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>default</code></td>
              <td>Custom label content (overrides label prop)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkbox-view {
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

.demo-group h3 {
  font-size: 1.25rem;
  color: #374151;
  margin-bottom: 1rem;
  font-weight: 600;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-section:last-child {
  margin-bottom: 0;
}

.state-display {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.state-display span {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.state-display code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  color: #1f2937;
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
}

.form-example {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-example h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-section h4 {
  font-size: 1.125rem;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.example-card {
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.example-card:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.example-card:last-child {
  margin-bottom: 0;
}

.example-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.api-table {
  overflow-x: auto;
}

.api-table h3 {
  font-size: 1.25rem;
  color: #374151;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.api-table h3:first-child {
  margin-top: 0;
}

.api-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.api-table thead {
  background: #f9fafb;
}

.api-table th {
  text-align: left;
  padding: 0.75rem;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

.api-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  color: #6b7280;
}

.api-table code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.8125rem;
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  color: #1f2937;
}

@media (max-width: 768px) {
  .view-header h1 {
    font-size: 2rem;
  }

  .demo-group {
    padding: 1.5rem;
  }

  .demo-row {
    flex-direction: column;
    gap: 1rem;
  }

  .api-table {
    font-size: 0.75rem;
  }

  .api-table th,
  .api-table td {
    padding: 0.5rem;
  }
}
</style>