<script setup lang="ts">
import { Alert } from '@/components'
</script>

<template>
  <div class="alert-view">
    <div class="view-header">
      <h1>Alert Component</h1>
      <p>Display contextual feedback messages for typical user actions</p>
    </div>

    <div class="demo-group">
      <h2>Variant: Color</h2>
      <div class="demo-column">
        <Alert type="success" icon>
          Success! Your operation completed successfully.
        </Alert>
        <Alert type="error" icon>
          Error! Something went wrong with your request.
        </Alert>
        <Alert type="warning" icon>
          Warning! Please review the information before proceeding.
        </Alert>
        <Alert type="info" icon>
          Info: Here's some helpful information for you.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>Variant: Outlined</h2>
      <div class="demo-column">
        <Alert variant="outlined" type="success" icon>
          Success outlined alert with transparent background.
        </Alert>
        <Alert variant="outlined" type="error" icon>
          Error outlined alert with transparent background.
        </Alert>
        <Alert variant="outlined" type="warning" icon>
          Warning outlined alert with transparent background.
        </Alert>
        <Alert variant="outlined" type="info" icon>
          Info outlined alert with transparent background.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>Variant: Border</h2>
      <div class="demo-column">
        <Alert variant="border" type="success" border="left" icon>
          Border left success alert with subtle background.
        </Alert>
        <Alert variant="border" type="error" border="top" icon>
          Border top error alert with subtle background.
        </Alert>
        <Alert variant="border" type="warning" border="right" icon>
          Border right warning alert with subtle background.
        </Alert>
        <Alert variant="border" type="info" border="bottom" icon>
          Border bottom info alert with subtle background.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>Without Icons</h2>
      <div class="demo-column">
        <Alert type="success">
          Simple success alert without icon.
        </Alert>
        <Alert variant="outlined" type="error">
          Simple outlined error alert without icon.
        </Alert>
        <Alert variant="border" type="warning" border="left">
          Simple border warning alert without icon.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>Closable Alerts</h2>
      <div class="demo-column">
        <Alert type="success" icon closable>
          This success alert can be closed by clicking the X button.
        </Alert>
        <Alert variant="outlined" type="error" icon closable>
          This error alert can be dismissed when you're done reading.
        </Alert>
        <Alert variant="border" type="info" border="left" icon closable>
          Click the close button to hide this information alert.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Titles</h2>
      <div class="demo-column">
        <Alert type="success" icon title="Operation Successful">
          Your changes have been saved to the database.
        </Alert>
        <Alert variant="outlined" type="error" icon title="Authentication Failed">
          Invalid credentials. Please check your username and password.
        </Alert>
        <Alert variant="border" type="warning" border="left" icon title="Action Required">
          Your account will expire in 3 days. Please renew your subscription.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Colors</h2>
      <div class="demo-column">
        <Alert 
          type="custom" 
          color="#8b5cf6" 
          title="Custom Purple"
          icon
          closable
        >
          This is a custom purple alert with a unique color scheme.
        </Alert>
        <Alert 
          variant="outlined" 
          type="custom" 
          color="#ec4899" 
          title="Custom Pink"
          icon
        >
          Custom pink outlined alert with custom styling.
        </Alert>
        <Alert 
          variant="border" 
          type="custom" 
          color="#10b981" 
          color-text="#065f46"
          border="left"
          title="Custom Green"
        >
          Custom green alert with custom text color.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>Centered Content</h2>
      <div class="demo-column">
        <Alert type="info" icon center>
          This alert has centered text content while the icon stays on the left.
        </Alert>
        <Alert variant="outlined" type="success" center>
          Centered text without icon for a clean centered layout.
        </Alert>
        <Alert variant="border" type="warning" border="top" icon center closable>
          Centered alert with icon and close button.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>Custom Padding</h2>
      <div class="demo-column">
        <Alert type="info" icon padding="0.5rem">
          Compact alert with reduced padding.
        </Alert>
        <Alert variant="outlined" type="success" icon padding="1.5rem">
          Spacious alert with increased padding.
        </Alert>
        <Alert variant="border" type="warning" border="left" icon padding="2rem">
          Extra spacious alert with generous padding.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>Complex Examples</h2>
      <div class="demo-column">
        <Alert 
          type="success" 
          icon 
          closable
          title="Payment Successful"
        >
          Your payment of $99.99 has been processed successfully. 
          A confirmation email has been sent to your registered email address.
        </Alert>
        
        <Alert 
          variant="outlined" 
          type="error" 
          icon 
          closable
          title="Server Error"
        >
          We encountered an unexpected error while processing your request. 
          Please try again later or contact support if the issue persists.
        </Alert>
        
        <Alert 
          variant="border" 
          type="warning" 
          border="left" 
          icon
          title="Security Notice"
        >
          We detected a login attempt from an unrecognized device. 
          If this wasn't you, please change your password immediately.
        </Alert>
        
        <Alert 
          type="custom"
          color="#8b5cf6"
          icon
          closable
          title="New Feature Available"
        >
          We've just launched a new dashboard with improved analytics. 
          Check out the new features in your account settings.
        </Alert>
      </div>
    </div>

    <div class="demo-group">
      <h2>All Border Positions</h2>
      <div class="demo-column">
        <Alert variant="border" type="info" border="top" icon>
          Alert with border on top
        </Alert>
        <Alert variant="border" type="success" border="right" icon>
          Alert with border on right
        </Alert>
        <Alert variant="border" type="warning" border="bottom" icon>
          Alert with border on bottom
        </Alert>
        <Alert variant="border" type="error" border="left" icon>
          Alert with border on left
        </Alert>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-view {
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