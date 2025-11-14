<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '@/components'
import { CheckCircleIcon, InfoIcon } from '@/components/Alert/icons'

const avatarLoading = ref(false)

const handleAvatarClick = () => {
  console.log('Avatar clicked!')
}

const handleImageError = () => {
  console.log('Image failed to load')
}

const loadAvatar = () => {
  avatarLoading.value = true
  setTimeout(() => {
    avatarLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="avatar-view">
    <div class="view-header">
      <h1>Avatar Component</h1>
      <p>Display user profiles, icons, or initials in circular or square containers</p>
    </div>

    <div class="demo-group">
      <h2>Preset Sizes</h2>
      <div class="demo-row">
        <Avatar size="xs" color="primary" text="XS" />
        <Avatar size="sm" color="primary" text="SM" />
        <Avatar size="md" color="primary" text="MD" />
        <Avatar size="lg" color="primary" text="LG" />
        <Avatar size="xl" color="primary" text="XL" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Sizes</h2>
      <div class="demo-row">
        <Avatar :size="30" color="success" text="30" />
        <Avatar :size="50" color="success" text="50" />
        <Avatar :size="70" color="success" text="70" />
        <Avatar size="100px" color="success" text="100px" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Colors</h2>
      <div class="demo-row">
        <Avatar text="P" color="primary" />
        <Avatar text="S" color="secondary" />
        <Avatar text="Su" color="success" />
        <Avatar text="E" color="error" />
        <Avatar text="W" color="warning" />
        <Avatar text="I" color="info" />
        <Avatar text="C1" custom-color="#8b5cf6" />
        <Avatar text="C2" custom-color="#ec4899" />
      </div>
    </div>

    <div class="demo-group">
      <h2>With Images</h2>
      <div class="demo-row">
        <Avatar 
          src="https://i.pravatar.cc/150?img=1" 
          alt="User 1"
          size="md"
        />
        <Avatar 
          src="https://i.pravatar.cc/150?img=2" 
          alt="User 2"
          size="lg"
        />
        <Avatar 
          src="https://i.pravatar.cc/150?img=3" 
          alt="User 3"
          size="xl"
        />
        <Avatar 
          src="https://invalid-url.com/image.jpg" 
          text="FB"
          color="error"
          size="lg"
          @error="handleImageError"
        />
      </div>
    </div>

    <div class="demo-group">
      <h2>With Icons</h2>
      <div class="demo-row">
        <Avatar :icon="CheckCircleIcon" color="success" size="md" />
        <Avatar :icon="InfoIcon" color="info" size="lg" />
        <Avatar icon="fas fa-user" color="primary" size="md" />
        <Avatar icon="fas fa-heart" color="error" size="lg" />
      </div>
    </div>

    <div class="demo-group">
      <h2>With Text (Initials)</h2>
      <div class="demo-row">
        <Avatar text="John Doe" color="primary" />
        <Avatar text="Jane Smith" color="success" />
        <Avatar text="Mike Johnson" color="warning" />
        <Avatar text="Sarah Williams" color="error" />
        <Avatar text="Tom Brown" color="info" />
        <Avatar text="A" color="secondary" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Tile (Square)</h2>
      <div class="demo-row">
        <Avatar text="JD" color="primary" tile size="md" />
        <Avatar text="JS" color="success" tile size="lg" />
        <Avatar 
          src="https://i.pravatar.cc/150?img=4" 
          tile 
          size="xl"
        />
        <Avatar :icon="CheckCircleIcon" color="warning" tile size="lg" />
      </div>
    </div>

    <div class="demo-group">
      <h2>Rounded Variants</h2>
      <div class="demo-row">
        <Avatar text="N" color="primary" rounded="none" />
        <Avatar text="SM" color="primary" rounded="sm" />
        <Avatar text="MD" color="primary" rounded="md" />
        <Avatar text="LG" color="primary" rounded="lg" />
        <Avatar text="XL" color="primary" rounded="xl" />
        <Avatar text="F" color="primary" rounded="full" />
      </div>
    </div>

    <div class="demo-group">
      <h2>With Elevation</h2>
      <div class="demo-row">
        <Avatar text="0" color="primary" :elevation="0" />
        <Avatar text="1" color="primary" :elevation="1" />
        <Avatar text="2" color="primary" :elevation="2" />
        <Avatar text="3" color="primary" :elevation="3" />
        <Avatar text="4" color="primary" :elevation="4" />
        <Avatar text="5" color="primary" :elevation="5" />
      </div>
    </div>

    <div class="demo-group">
      <h2>With Border</h2>
      <div class="demo-row">
        <Avatar 
          src="https://i.pravatar.cc/150?img=5" 
          bordered 
          border-color="#ffffff"
          :border-width="3"
          size="lg"
        />
        <Avatar 
          text="JD" 
          color="primary" 
          bordered 
          border-color="#10b981"
          :border-width="4"
          size="lg"
        />
        <Avatar 
          text="AB" 
          custom-color="#ec4899" 
          bordered 
          border-color="#be185d"
          border-width="5px"
          size="xl"
        />
      </div>
    </div>

    <div class="demo-group">
      <h2>Loading State</h2>
      <div class="demo-row">
        <Avatar 
          src="https://i.pravatar.cc/150?img=6" 
          :loading="avatarLoading"
          size="lg"
        />
        <Button @click="loadAvatar" size="sm">
          Toggle Loading
        </Button>
      </div>
    </div>

    <div class="demo-group">
      <h2>Clickable</h2>
      <div class="demo-row">
        <Avatar 
          text="Click" 
          color="info" 
          size="lg"
          @click="handleAvatarClick"
          style="cursor: pointer;"
        />
        <Avatar 
          src="https://i.pravatar.cc/150?img=7" 
          size="lg"
          @click="handleAvatarClick"
          style="cursor: pointer;"
        />
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Slot</h2>
      <div class="demo-row">
        <Avatar color="primary" size="lg">
          <span style="font-size: 2rem;">🎉</span>
        </Avatar>
        <Avatar color="warning" size="lg">
          <span style="font-size: 2rem;">⭐</span>
        </Avatar>
        <Avatar custom-color="#10b981" size="xl">
          <div style="display: flex; flex-direction: column; align-items: center; font-size: 0.75rem;">
            <span style="font-weight: bold;">99+</span>
          </div>
        </Avatar>
      </div>
    </div>

    <div class="demo-group">
      <h2>Avatar Group</h2>
      <div class="avatar-group">
        <Avatar 
          src="https://i.pravatar.cc/150?img=8"
          size="md"
          bordered
          border-color="#ffffff"
          :border-width="2"
        />
        <Avatar 
          src="https://i.pravatar.cc/150?img=9"
          size="md"
          bordered
          border-color="#ffffff"
          :border-width="2"
        />
        <Avatar 
          src="https://i.pravatar.cc/150?img=10"
          size="md"
          bordered
          border-color="#ffffff"
          :border-width="2"
        />
        <Avatar 
          text="+5"
          color="secondary"
          size="md"
          bordered
          border-color="#ffffff"
          :border-width="2"
        />
      </div>
    </div>

    <div class="demo-group">
      <h2>Complex Examples</h2>
      <div class="demo-row">
        <Avatar 
          src="https://i.pravatar.cc/150?img=11"
          size="xl"
          bordered
          :border-width="4"
          border-color="#10b981"
          :elevation="3"
          @click="handleAvatarClick"
          style="cursor: pointer;"
        />
        <Avatar 
          text="Admin"
          custom-color="#8b5cf6"
          text-color="#ffffff"
          size="80px"
          rounded="lg"
          :elevation="2"
          bordered
          border-color="#7c3aed"
          :border-width="3"
        />
        <Avatar 
          :icon="CheckCircleIcon"
          custom-color="#059669"
          size="100px"
          :elevation="4"
          rounded="xl"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-view {
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
  gap: 1.5rem;
  align-items: center;
}

.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-group > * {
  margin-left: -10px;
}

.avatar-group > *:first-child {
  margin-left: 0;
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

  .avatar-group {
    justify-content: center;
  }
}
</style>