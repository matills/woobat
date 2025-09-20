<template>
  <PlaygroundLayout
    title="Button Component"
    description="A highly customizable button component with multiple variants, sizes, and interactive features."
    :generated-code="generatedCode"
  >
    <template #controls>
      <PropControl
        v-model="props.variant"
        label="Variant"
        type="select"
        :options="variantOptions"
        description="Visual style variant of the button"
      />
      
      <PropControl
        v-model="props.size"
        label="Size"
        type="select"
        :options="sizeOptions"
        description="Size of the button"
      />
      
      <PropControl
        v-model="props.color"
        label="Color"
        type="select"
        :options="colorOptions"
        description="Color theme of the button"
      />
      
      <PropControl
        v-model="props.customColor"
        label="Custom Color"
        type="string"
        placeholder="e.g., #ff6b35, rgb(255, 107, 53)"
        description="Custom color override (overrides color prop)"
      />
      
      <PropControl
        v-model="props.textColor"
        label="Text Color"
        type="string"
        placeholder="e.g., #ffffff, #000000"
        description="Override text color specifically"
      />
      
      <PropControl
        v-model="props.borderColor"
        label="Border Color"
        type="string"
        placeholder="e.g., #ff0000, #00ff00"
        description="Override border color specifically"
      />
      
      <PropControl
        v-model="props.iconColor"
        label="Icon Color"
        type="string"
        placeholder="e.g., #ff6b35, #8b5cf6"
        description="Override icon color specifically"
      />
      
      <PropControl
        v-model="props.block"
        label="Block"
        type="boolean"
        description="Make button full width"
      />
      
      <PropControl
        v-model="props.disabled"
        label="Disabled"
        type="boolean"
        description="Disable the button"
      />
      
      <PropControl
        v-model="props.loading"
        label="Loading"
        type="boolean"
        description="Show loading state"
      />
      
      <PropControl
        v-model="props.ripple"
        label="Ripple Effect"
        type="boolean"
        description="Enable ripple animation on click"
      />
      
      <PropControl
        v-model="props.elevation"
        label="Elevation"
        type="select"
        :options="elevationOptions"
        description="Shadow elevation level"
      />
      
      <PropControl
        v-model="props.rounded"
        label="Rounded"
        type="select"
        :options="roundedOptions"
        description="Border radius style"
      />
      
      <PropControl
        v-model="props.iconLeft"
        label="Left Icon"
        type="string"
        placeholder="e.g., heart, star, user"
        description="Lucide icon name for left side"
      />
      
      <PropControl
        v-model="props.iconRight"
        label="Right Icon"
        type="string"
        placeholder="e.g., arrow-right, external-link"
        description="Lucide icon name for right side"
      />
      
      <PropControl
        v-model="props.iconOnly"
        label="Icon Only"
        type="boolean"
        description="Hide text, show only icon"
      />
      
      <PropControl
        v-model="props.noPadding"
        label="No Padding"
        type="boolean"
        description="Remove all padding (text-only button)"
      />
      
      <PropControl
        v-model="buttonText"
        label="Button Text"
        type="string"
        placeholder="Click me"
        description="Text content of the button"
      />
    </template>
    
    <template #preview>
      <wb-btn
        :variant="props.variant"
        :size="props.size"
        :color="props.color"
        :custom-color="props.customColor || undefined"
        :text-color="props.textColor || undefined"
        :border-color="props.borderColor || undefined"
        :icon-color="props.iconColor || undefined"
        :block="props.block"
        :disabled="props.disabled"
        :loading="props.loading"
        :ripple="props.ripple"
        :elevation="props.elevation"
        :rounded="props.rounded"
        :icon-left="props.iconLeft || undefined"
        :icon-right="props.iconRight || undefined"
        :icon-only="props.iconOnly"
        :no-padding="props.noPadding"
        @click="handleClick"
      >
        {{ buttonText }}
      </wb-btn>
    </template>
    
    <template #documentation>
      <div class="examples-section">
        <h4>Examples</h4>
        
        <div class="example-group">
          <h5>Variants</h5>
          <div class="example-row">
            <wb-btn variant="filled">Filled</wb-btn>
            <wb-btn variant="tonal">Tonal</wb-btn>
            <wb-btn variant="outlined">Outlined</wb-btn>
            <wb-btn variant="text">Text</wb-btn>
            <wb-btn variant="elevated">Elevated</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn variant="tonal"&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn variant=&quot;tonal&quot;&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Sizes</h5>
          <div class="example-row">
            <wb-btn size="xs">Extra Small</wb-btn>
            <wb-btn size="sm">Small</wb-btn>
            <wb-btn size="md">Medium</wb-btn>
            <wb-btn size="lg">Large</wb-btn>
            <wb-btn size="xl">Extra Large</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn size="lg"&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn size=&quot;lg&quot;&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Colors</h5>
          <div class="example-row">
            <wb-btn color="primary">Primary</wb-btn>
            <wb-btn color="secondary">Secondary</wb-btn>
            <wb-btn color="success">Success</wb-btn>
            <wb-btn color="warning">Warning</wb-btn>
            <wb-btn color="error">Error</wb-btn>
            <wb-btn color="info">Info</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn color="success"&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn color=&quot;success&quot;&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>With Icons</h5>
          <div class="example-row">
            <wb-btn icon-left="heart">Like</wb-btn>
            <wb-btn icon-right="arrow-right">Next</wb-btn>
            <wb-btn icon-left="download" icon-right="external-link">Download</wb-btn>
            <wb-btn icon-left="settings" icon-only />
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn icon-left="heart"&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn icon-left=&quot;heart&quot;&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>States</h5>
          <div class="example-row">
            <wb-btn loading>Loading</wb-btn>
            <wb-btn disabled>Disabled</wb-btn>
            <wb-btn :ripple="false">No Ripple</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn loading&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn loading&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Layout & Styling</h5>
          <div class="example-row">
            <wb-btn block>Block Button</wb-btn>
            <wb-btn elevation="2">Elevated</wb-btn>
            <wb-btn rounded="full">Full Rounded</wb-btn>
            <wb-btn no-padding variant="text">No Padding</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn block elevation="2"&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn block elevation=&quot;2&quot;&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Click Animations</h5>
          <div class="example-row">
            <wb-btn click-animation="scale">Scale</wb-btn>
            <wb-btn click-animation="pulse">Pulse</wb-btn>
            <wb-btn click-animation="shake">Shake</wb-btn>
            <wb-btn click-animation="bounce">Bounce</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn click-animation="pulse"&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn click-animation=&quot;pulse&quot;&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Custom Colors</h5>
          <div class="example-row">
            <wb-btn custom-color="#ff6b35">Orange</wb-btn>
            <wb-btn custom-color="#8b5cf6" variant="tonal">Purple Tonal</wb-btn>
            <wb-btn custom-color="#10b981" variant="outlined">Green Outlined</wb-btn>
            <wb-btn icon-left="heart" icon-color="#ef4444">Custom Icon</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn custom-color="#ff6b35"&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn custom-color=&quot;#ff6b35&quot;&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Loading States</h5>
          <div class="example-row">
            <wb-btn loading>Loading</wb-btn>
            <wb-btn loading loading-text="Processing...">With Text</wb-btn>
            <wb-btn loading custom-color="#8b5cf6">Custom Color</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn loading loading-text="Processing..."&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn loading loading-text=&quot;Processing...&quot;&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Link Buttons</h5>
          <div class="example-row">
            <wb-btn tag="a" href="https://example.com" target="_blank">External Link</wb-btn>
            <wb-btn tag="a" href="/internal" icon-right="arrow-right">Internal Link</wb-btn>
            <wb-btn tag="router-link" to="/home">Router Link</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn tag="a" href="https://example.com" target="_blank"&gt;External Link&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn tag=&quot;a&quot; href=&quot;https://example.com&quot; target=&quot;_blank&quot;&gt;External Link&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Custom Padding</h5>
          <div class="example-row">
            <wb-btn padding="8px 16px">Custom Padding</wb-btn>
            <wb-btn padding="12px 24px" size="lg">Large Padding</wb-btn>
            <wb-btn padding="none" variant="text">No Padding</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn padding="8px 16px"&gt;Click me&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn padding=&quot;8px 16px&quot;&gt;Click me&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Loading States Avanzados</h5>
          <p class="example-description">Control completo sobre el estado de carga con diferentes opciones de texto</p>
          <div class="example-row">
            <wb-btn loading loading-text="Procesando...">Con Texto Personalizado</wb-btn>
            <wb-btn loading preserve-text>Mantener Texto Original</wb-btn>
            <wb-btn loading :show-loading-text="false">Solo Animación</wb-btn>
            <wb-btn loading loading-text="Guardando..." custom-color="#10b981">Personalizado</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn loading preserve-text&gt;Mantener Texto&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn loading preserve-text&gt;Mantener Texto&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Detección de Cuadrantes</h5>
          <p class="example-description">Detecta en qué cuadrante del botón se hizo clic para interacciones avanzadas</p>
          <div class="example-row">
            <wb-btn detect-quadrant @advanced-click="handleAdvancedClick">Detectar Cuadrante</wb-btn>
            <wb-btn detect-quadrant variant="outlined" @advanced-click="handleAdvancedClick">Outlined</wb-btn>
            <wb-btn detect-quadrant size="lg" @advanced-click="handleAdvancedClick">Large</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn detect-quadrant @advanced-click="handleClick"&gt;Detectar&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn detect-quadrant @advanced-click=&quot;handleClick&quot;&gt;Detectar&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Animaciones Personalizadas</h5>
          <p class="example-description">Controla la duración y tipo de animación al hacer clic</p>
          <div class="example-row">
            <wb-btn click-animation="scale" animation-duration="100">Rápida</wb-btn>
            <wb-btn click-animation="pulse" animation-duration="500">Lenta</wb-btn>
            <wb-btn click-animation="bounce" animation-duration="300">Bounce</wb-btn>
            <wb-btn click-animation="shake" animation-duration="200">Shake</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn click-animation="pulse" animation-duration="500"&gt;Lenta&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn click-animation=&quot;pulse&quot; animation-duration=&quot;500&quot;&gt;Lenta&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Estilos de Contenido Personalizados</h5>
          <p class="example-description">Aplica clases CSS y estilos inline al contenido del botón</p>
          <div class="example-row">
            <wb-btn content-class="custom-content" content-style="font-weight: bold; text-transform: uppercase">Bold Uppercase</wb-btn>
            <wb-btn content-style="letter-spacing: 2px; font-size: 14px">Spaced Text</wb-btn>
            <wb-btn content-class="gradient-text" content-style="background: linear-gradient(45deg, #ff6b35, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent">Gradient Text</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn content-style="font-weight: bold; text-transform: uppercase"&gt;Estilo&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn content-style=&quot;font-weight: bold; text-transform: uppercase&quot;&gt;Estilo&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Botones Sin Padding</h5>
          <p class="example-description">Botones sin padding (automáticamente sin ripple) ideales para enlaces inline</p>
          <div class="example-row">
            <wb-btn no-padding variant="text">Enlace Inline</wb-btn>
            <wb-btn no-padding variant="text" icon-left="arrow-right">Con Icono</wb-btn>
            <wb-btn no-padding variant="text" custom-color="#ef4444">Color Personalizado</wb-btn>
            <wb-btn no-padding variant="text" :ripple="true">Con Ripple Forzado</wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn no-padding variant="text"&gt;Enlace Inline&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn no-padding variant=&quot;text&quot;&gt;Enlace Inline&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
        
        <div class="example-group">
          <h5>Zonas de Clic Avanzadas</h5>
          <p class="example-description">Define áreas específicas clickeables dentro del botón para interacciones complejas</p>
          <div class="example-row">
            <wb-btn 
              :click-zones="clickZonesExample" 
              @zone-click="handleZoneClick"
              style="position: relative; width: 200px; height: 50px;"
            >
              Botón con Zonas
            </wb-btn>
          </div>
          <div class="example-code-section">
            <code>&lt;wb-btn :click-zones="zones" @zone-click="handleZone"&gt;Zonas&lt;/wb-btn&gt;</code>
            <button @click="copyExample('&lt;wb-btn :click-zones=&quot;zones&quot; @zone-click=&quot;handleZone&quot;&gt;Zonas&lt;/wb-btn&gt;')" class="copy-btn">
              <Copy :size="16" />
              Copy
            </button>
          </div>
        </div>
      </div>
      
      <PropsTable :props="buttonProps" />
    </template>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy } from 'lucide-vue-next'
import PlaygroundLayout from '../components/PlaygroundLayout.vue'
import PropControl from '../components/PropControl.vue'
import PropsTable from '../components/PropsTable.vue'

const buttonText = ref('Click me')

const props = ref({
  variant: 'filled' as const,
  size: 'md' as const,
  color: 'primary' as const,
  customColor: '',
  textColor: '',
  borderColor: '',
  iconColor: '',
  block: false,
  disabled: false,
  loading: false,
  ripple: true,
  elevation: 0,
  rounded: true,
  iconLeft: '',
  iconRight: '',
  iconOnly: false,
  noPadding: false
})

const variantOptions = [
  { label: 'Filled', value: 'filled' },
  { label: 'Tonal', value: 'tonal' },
  { label: 'Outlined', value: 'outlined' },
  { label: 'Text', value: 'text' },
  { label: 'Elevated', value: 'elevated' }
]

const sizeOptions = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' }
]

const colorOptions = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Info', value: 'info' }
]

const elevationOptions = [
  { label: 'None', value: 0 },
  { label: 'Level 1', value: 1 },
  { label: 'Level 2', value: 2 },
  { label: 'Level 3', value: 3 },
  { label: 'Level 4', value: 4 },
  { label: 'Level 5', value: 5 }
]

const roundedOptions = [
  { label: 'True', value: true },
  { label: 'False', value: false },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2XL', value: '2xl' },
  { label: '3XL', value: '3xl' },
  { label: 'Full', value: 'full' }
]

const generatedCode = computed(() => {
  const attributes = []
  
  if (props.value.variant !== 'filled') attributes.push(`variant="${props.value.variant}"`)
  if (props.value.size !== 'md') attributes.push(`size="${props.value.size}"`)
  if (props.value.color !== 'primary') attributes.push(`color="${props.value.color}"`)
  if (props.value.block) attributes.push('block')
  if (props.value.disabled) attributes.push('disabled')
  if (props.value.loading) attributes.push('loading')
  if (!props.value.ripple) attributes.push(':ripple="false"')
  if (props.value.elevation > 0) attributes.push(`elevation="${props.value.elevation}"`)
  if (props.value.rounded !== true) attributes.push(`rounded="${props.value.rounded}"`)
  if (props.value.iconLeft) attributes.push(`icon-left="${props.value.iconLeft}"`)
  if (props.value.iconRight) attributes.push(`icon-right="${props.value.iconRight}"`)
  if (props.value.iconOnly) attributes.push('icon-only')
  if (props.value.customColor) attributes.push(`custom-color="${props.value.customColor}"`)
  if (props.value.textColor) attributes.push(`text-color="${props.value.textColor}"`)
  if (props.value.borderColor) attributes.push(`border-color="${props.value.borderColor}"`)
  if (props.value.iconColor) attributes.push(`icon-color="${props.value.iconColor}"`)
  if (props.value.noPadding) attributes.push('no-padding')
  
  const attrsString = attributes.length > 0 ? ' ' + attributes.join(' ') : ''
  const content = props.value.iconOnly ? '' : buttonText.value
  
  return `<wb-btn${attrsString}>${content}</wb-btn>`
})

const buttonProps = [
  {
    name: 'variant',
    type: 'ButtonVariant',
    default: 'filled',
    description: 'Visual style variant of the button',
    example: 'variant="tonal"'
  },
  {
    name: 'size',
    type: 'ComponentSize',
    default: 'md',
    description: 'Size of the button',
    example: 'size="lg"'
  },
  {
    name: 'color',
    type: 'ColorVariant',
    default: 'primary',
    description: 'Color theme of the button',
    example: 'color="success"'
  },
  {
    name: 'customColor',
    type: 'string',
    description: 'Custom color override (CSS color value)',
    example: 'custom-color="#ff6b35"'
  },
  {
    name: 'textColor',
    type: 'string',
    description: 'Override text color specifically (CSS color value)',
    example: 'text-color="#ffffff"'
  },
  {
    name: 'borderColor',
    type: 'string',
    description: 'Override border color specifically (CSS color value)',
    example: 'border-color="#8b5cf6"'
  },
  {
    name: 'iconColor',
    type: 'string',
    description: 'Override icon color specifically (CSS color value)',
    example: 'icon-color="#ef4444"'
  },
  {
    name: 'block',
    type: 'boolean',
    default: false,
    description: 'Make button full width',
    example: 'block'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Disable the button',
    example: 'disabled'
  },
  {
    name: 'loading',
    type: 'boolean',
    default: false,
    description: 'Show loading state with spinner',
    example: 'loading'
  },
  {
    name: 'loadingText',
    type: 'string',
    description: 'Text to show during loading state',
    example: 'loading-text="Processing..."'
  },
  {
    name: 'showLoadingText',
    type: 'boolean',
    default: true,
    description: 'Whether to show text during loading state',
    example: ':show-loading-text="false"'
  },
  {
    name: 'preserveText',
    type: 'boolean',
    default: false,
    description: 'Keep original button text during loading',
    example: 'preserve-text'
  },
  {
    name: 'ripple',
    type: 'boolean',
    default: true,
    description: 'Enable ripple animation on click',
    example: ':ripple="false"'
  },
  {
    name: 'iconLeft',
    type: 'string',
    description: 'Lucide icon name for left side (supports kebab-case)',
    example: 'icon-left="heart"'
  },
  {
    name: 'iconRight',
    type: 'string',
    description: 'Lucide icon name for right side (supports kebab-case)',
    example: 'icon-right="arrow-right"'
  },
  {
    name: 'iconOnly',
    type: 'boolean',
    default: false,
    description: 'Hide text, show only icon',
    example: 'icon-only'
  },
  {
    name: 'padding',
    type: 'string | number | "none"',
    default: 'auto',
    description: 'Custom padding value or "none" to remove padding',
    example: 'padding="8px 16px"'
  },
  {
    name: 'noPadding',
    type: 'boolean',
    default: false,
    description: 'Remove all padding for text-only appearance',
    example: 'no-padding'
  },
  {
    name: 'elevation',
    type: 'ElevationLevel',
    default: 0,
    description: 'Shadow elevation level (0-5)',
    example: 'elevation="2"'
  },
  {
    name: 'rounded',
    type: 'BorderRadius',
    default: true,
    description: 'Border radius style',
    example: 'rounded="full"'
  },
  {
    name: 'tag',
    type: '"button" | "a" | "router-link" | "nuxt-link"',
    default: 'button',
    description: 'HTML tag or Vue component to render',
    example: 'tag="a"'
  },
  {
    name: 'href',
    type: 'string',
    description: 'URL for anchor tag (when tag="a")',
    example: 'href="https://example.com"'
  },
  {
    name: 'target',
    type: 'string',
    description: 'Target attribute for anchor tag',
    example: 'target="_blank"'
  },
  {
    name: 'to',
    type: 'string | object',
    description: 'Route for router-link or nuxt-link',
    example: 'to="/home"'
  },
  {
    name: 'type',
    type: '"button" | "submit" | "reset"',
    default: 'button',
    description: 'Button type attribute',
    example: 'type="submit"'
  },
  {
    name: 'clickZones',
    type: 'ClickZone[]',
    description: 'Array of clickable zones for advanced interactions',
    example: ':click-zones="zones"'
  },
  {
    name: 'detectQuadrant',
    type: 'boolean',
    default: false,
    description: 'Detect which quadrant was clicked',
    example: 'detect-quadrant'
  },
  {
    name: 'clickAnimation',
    type: '"scale" | "shake" | "pulse" | "bounce" | "none"',
    default: 'scale',
    description: 'Animation to play on click',
    example: 'click-animation="pulse"'
  },
  {
    name: 'animationDuration',
    type: 'number',
    default: 150,
    description: 'Duration of click animation in milliseconds',
    example: 'animation-duration="300"'
  },
  {
    name: 'contentClass',
    type: 'string',
    description: 'CSS class for the button content wrapper',
    example: 'content-class="custom-content"'
  },
  {
    name: 'contentStyle',
    type: 'CSSProperties | string',
    description: 'Inline styles for the button content wrapper',
    example: 'content-style="font-weight: bold"'
  }
]

const handleClick = () => {
  console.log('Button clicked!')
}

const handleAdvancedClick = (event: any) => {
  console.log('Advanced click detected:', event)
  alert(`Cuadrante detectado: ${event.quadrant}`)
}

const handleZoneClick = (zone: any, event: any) => {
  console.log('Zone clicked:', zone, event)
  alert(`Zona clickeada: ${zone.id}`)
}

const clickZonesExample = [
  {
    id: 'left-zone',
    area: [0, 0, 50, 100], // x, y, width, height percentages
    action: (e: MouseEvent) => console.log('Left zone clicked'),
    active: true
  },
  {
    id: 'right-zone', 
    area: [50, 0, 50, 100],
    action: (e: MouseEvent) => console.log('Right zone clicked'),
    active: true
  }
]

const copyExample = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code)
    console.log('Code copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<style scoped>
.examples-section {
  margin-bottom: 32px;
}

.examples-section h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24px;
}

.example-group {
  margin-bottom: 24px;
}

.example-group h5 {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.example-description {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 12px;
  font-style: italic;
}

.example-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.example-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.example-code-section {
  position: relative;
  display: flex;
  align-items: center;
  background: #1e293b;
  border-radius: 8px;
  margin-top: 16px;
  overflow: hidden;
}

.example-code {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: #f1f5f9;
  border-radius: 4px;
  font-size: 12px;
  max-width: 200px;
}

.example-code code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: #475569;
  word-break: break-all;
}

.example-code-section code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: #e2e8f0;
  padding: 16px 60px 16px 16px;
  font-size: 14px;
  flex: 1;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
  max-width: 100%;
}

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  font-size: 12px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.copy-btn:hover {
  opacity: 1;
  background: #e2e8f0;
}

.example-code-section .copy-btn {
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
  opacity: 1;
}

.example-code-section .copy-btn:hover {
  background: #2563eb;
}
</style>
