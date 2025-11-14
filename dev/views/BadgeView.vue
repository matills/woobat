<script setup lang="ts">
import { ref } from 'vue'
import { Badge, Avatar, Button } from '@/components'
import { CheckCircleIcon } from '@/components/Alert/icons'

const badgeCount = ref(5)
const badgeMessages = ref(3)

const incrementBadge = () => {
  badgeCount.value++
}

const decrementBadge = () => {
  if (badgeCount.value > 0) badgeCount.value--
}
</script>

<template>
  <div class="badge-view">
    <div class="view-header">
      <h1>Badge Component</h1>
      <p>Display notifications, status indicators, and counts on elements</p>
    </div>

    <div class="demo-group">
      <h2>Positions & Alignment</h2>
      
      <div class="subsection">
        <h3>Top Position</h3>
        <div class="demo-row">
          <Badge :content="5" position="top" align="start">
            <Avatar size="lg" text="TS" color="primary" />
          </Badge>
          <Badge :content="12" position="top" align="center">
            <Avatar size="lg" text="TC" color="success" />
          </Badge>
          <Badge :content="99" position="top" align="end">
            <Avatar size="lg" text="TE" color="warning" />
          </Badge>
        </div>
      </div>

      <div class="subsection">
        <h3>Bottom Position</h3>
        <div class="demo-row">
          <Badge :content="3" position="bottom" align="start">
            <Avatar size="lg" text="BS" color="primary" />
          </Badge>
          <Badge :content="7" position="bottom" align="center">
            <Avatar size="lg" text="BC" color="success" />
          </Badge>
          <Badge :content="42" position="bottom" align="end">
            <Avatar size="lg" text="BE" color="warning" />
          </Badge>
        </div>
      </div>

      <div class="subsection">
        <h3>Left Position</h3>
        <div class="demo-row">
          <Badge :content="2" position="left" align="start">
            <Avatar size="lg" text="LS" color="primary" />
          </Badge>
          <Badge :content="8" position="left" align="center">
            <Avatar size="lg" text="LC" color="success" />
          </Badge>
          <Badge :content="15" position="left" align="end">
            <Avatar size="lg" text="LE" color="warning" />
          </Badge>
        </div>
      </div>

      <div class="subsection">
        <h3>Right Position</h3>
        <div class="demo-row">
          <Badge :content="1" position="right" align="start">
            <Avatar size="lg" text="RS" color="primary" />
          </Badge>
          <Badge :content="9" position="right" align="center">
            <Avatar size="lg" text="RC" color="success" />
          </Badge>
          <Badge :content="50" position="right" align="end">
            <Avatar size="lg" text="RE" color="warning" />
          </Badge>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Formats</h2>
      
      <div class="subsection">
        <h3>Dot Format</h3>
        <div class="demo-row">
          <Badge dot color="success">
            <Avatar size="lg" text="Online" color="primary" />
          </Badge>
          <Badge dot color="error">
            <Avatar size="lg" text="Offline" color="secondary" />
          </Badge>
          <Badge dot color="warning">
            <Avatar size="lg" text="Away" color="info" />
          </Badge>
          <Badge dot color="info">
            <Avatar size="lg" text="Idle" color="warning" />
          </Badge>
        </div>
      </div>

      <div class="subsection">
        <h3>Default Format (With Content)</h3>
        <div class="demo-row">
          <Badge :content="5" format="default">
            <Button size="lg">Notifications</Button>
          </Badge>
          <Badge :content="3" format="default">
            <Button size="lg" color="success">Messages</Button>
          </Badge>
          <Badge :content="12" format="default">
            <Button size="lg" color="warning">Alerts</Button>
          </Badge>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Max Value</h2>
      <div class="demo-row">
        <Badge :content="150" :max="99">
          <Avatar size="lg" text="M1" color="primary" />
        </Badge>
        <Badge :content="999" :max="99">
          <Avatar size="lg" text="M2" color="success" />
        </Badge>
        <Badge :content="50" :max="99">
          <Avatar size="lg" text="M3" color="warning" />
        </Badge>
        <Badge :content="1000" :max="999">
          <Button size="lg">Notifications</Button>
        </Badge>
      </div>
    </div>

    <div class="demo-group">
      <h2>Colors</h2>
      <div class="demo-row">
        <Badge :content="1" color="primary">
          <Avatar size="lg" text="P" color="primary" />
        </Badge>
        <Badge :content="2" color="secondary">
          <Avatar size="lg" text="S" color="secondary" />
        </Badge>
        <Badge :content="3" color="success">
          <Avatar size="lg" text="SU" color="success" />
        </Badge>
        <Badge :content="4" color="error">
          <Avatar size="lg" text="E" color="error" />
        </Badge>
        <Badge :content="5" color="warning">
          <Avatar size="lg" text="W" color="warning" />
        </Badge>
        <Badge :content="6" color="info">
          <Avatar size="lg" text="I" color="info" />
        </Badge>
        <Badge :content="7" custom-color="#8b5cf6">
          <Avatar size="lg" text="C" custom-color="#8b5cf6" />
        </Badge>
      </div>
    </div>

    <div class="demo-group">
      <h2>Bordered</h2>
      <div class="demo-row">
        <Badge :content="5" bordered border-color="#ffffff">
          <Avatar size="lg" text="B1" color="primary" />
        </Badge>
        <Badge :content="10" bordered border-color="#ffffff">
          <Avatar size="lg" text="B2" color="success" />
        </Badge>
        <Badge dot bordered border-color="#ffffff">
          <Avatar size="lg" text="DOT" color="error" />
        </Badge>
      </div>
    </div>

    <div class="demo-group">
      <h2>Pulse Animation</h2>
      <div class="demo-row">
        <Badge :content="3" pulse color="error">
          <Avatar size="lg" text="PU1" color="primary" />
        </Badge>
        <Badge dot pulse color="warning">
          <Avatar size="lg" text="PU2" color="success" />
        </Badge>
        <Badge :content="99" pulse custom-color="#ec4899">
          <Avatar size="lg" text="PU3" color="warning" />
        </Badge>
      </div>
    </div>

    <div class="demo-group">
      <h2>Overlap Mode</h2>
      <div class="comparison">
        <div class="comparison-item">
          <h3>With Overlap</h3>
          <div class="demo-row">
            <Badge :content="1" overlap>
              <Avatar size="md" text="O1" color="primary" />
            </Badge>
            <Badge :content="2" overlap>
              <Avatar size="md" text="O2" color="success" />
            </Badge>
            <Badge :content="3" overlap>
              <Avatar size="md" text="O3" color="warning" />
            </Badge>
          </div>
        </div>
        <div class="comparison-item">
          <h3>Without Overlap</h3>
          <div class="demo-row">
            <Badge :content="1" :overlap="false">
              <Avatar size="md" text="NO1" color="primary" />
            </Badge>
            <Badge :content="2" :overlap="false">
              <Avatar size="md" text="NO2" color="success" />
            </Badge>
            <Badge :content="3" :overlap="false">
              <Avatar size="md" text="NO3" color="warning" />
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Interactive Example</h2>
      <div class="interactive">
        <Badge :content="badgeCount">
          <Button size="lg">Cart ({{ badgeCount }})</Button>
        </Badge>
        <div class="controls">
          <Button @click="incrementBadge" size="sm" variant="tonal" color="success">
            Increment
          </Button>
          <Button @click="decrementBadge" size="sm" variant="tonal" color="error">
            Decrement
          </Button>
        </div>
      </div>
    </div>

    <div class="demo-group">
      <h2>Complex Examples</h2>
      <div class="demo-row">
        <Badge 
          :content="99" 
          :max="9" 
          position="top" 
          align="end" 
          pulse 
          color="error" 
          bordered 
          border-color="#ffffff"
        >
          <Avatar src="https://i.pravatar.cc/150?img=20" size="xl" />
        </Badge>
        <Badge dot pulse color="success" position="bottom" align="end">
          <Avatar text="Online" size="xl" color="info" />
        </Badge>
        <Badge :content="5" color="warning" position="right" align="center">
          <Avatar :icon="CheckCircleIcon" size="xl" color="primary" />
        </Badge>
        <Badge 
          :content="12" 
          position="top" 
          align="start" 
          custom-color="#ec4899"
        >
          <Avatar text="VIP" size="xl" custom-color="#831843" />
        </Badge>
      </div>
    </div>

    <div class="demo-group">
      <h2>With Different Components</h2>
      <div class="demo-row">
        <Badge :content="3" color="error">
          <Button :icon-left="CheckCircleIcon">Notifications</Button>
        </Badge>
        <Badge :content="7" color="warning">
          <Button variant="outlined" color="info">Messages</Button>
        </Badge>
        <Badge dot pulse color="success">
          <Button variant="tonal" color="success">Online</Button>
        </Badge>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge-view {
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

.subsection {
  margin-bottom: 2rem;
}

.subsection:last-child {
  margin-bottom: 0;
}

.subsection h3 {
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 1rem;
  font-weight: 600;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.comparison-item h3 {
  font-size: 1rem;
  color: #374151;
  margin-bottom: 1rem;
  font-weight: 600;
}

.interactive {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.controls {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .view-header h1 {
    font-size: 2rem;
  }

  .demo-group {
    padding: 1.5rem;
  }

  .demo-row {
    gap: 1.5rem;
  }

  .comparison {
    grid-template-columns: 1fr;
  }
}
</style>