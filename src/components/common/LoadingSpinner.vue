<template>
  <div v-if="isLoading" :class="['loading-container', { 'loading-overlay': overlay, 'loading-inline': !overlay }]">
    <div class="loading-spinner">
      <div :class="['spinner', `spinner--${variant}`]"></div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    variant: {
      type: String,
      default: 'default', // 'default', 'dots', 'pulse'
      validator: (value) => ['default', 'dots', 'pulse'].includes(value),
    },
  },
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.loading-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding: 2em;
  background: var(--off-main);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.loading-inline .loading-spinner {
  background: transparent;
  box-shadow: none;
}

/* Spinner padrão */
.spinner--default {
  width: 50px;
  height: 50px;
  border: 4px solid var(--figure-bg);
  border-top: 4px solid var(--rosewood);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Spinner com dots */
.spinner--dots {
  width: 60px;
  height: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.spinner--dots::before,
.spinner--dots::after {
  content: '';
  width: 12px;
  height: 12px;
  background: var(--rosewood);
  border-radius: 50%;
  animation: dotBounce 1.4s infinite ease-in-out both;
}

.spinner--dots::before {
  animation-delay: -0.32s;
}

.spinner--dots::after {
  animation-delay: 0s;
}

@keyframes dotBounce {
  0%, 80%, 100% { 
    transform: scale(0);
  }
  40% { 
    transform: scale(1);
  }
}

/* Spinner com pulse */
.spinner--pulse {
  width: 50px;
  height: 50px;
  background: var(--rosewood);
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
}

.loading-message {
  margin: 0;
  color: var(--text);
  font-size: 1em;
  font-weight: 500;
  text-align: center;
}
</style>
