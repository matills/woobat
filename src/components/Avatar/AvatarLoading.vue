<template>
  <div class="wb-avatar__loading">
    <div class="wb-avatar__spinner" />
  </div>
</template>

<style scoped>
.wb-avatar__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: inherit;
}

.wb-avatar__spinner {
  width: 40%;
  height: 40%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>