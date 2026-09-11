<template>
  <div v-if="error" :class="['error-display', `error-display--${type}`]">
    <div class="error-display__icon">
      <span v-if="type === 'error'">✕</span>
      <span v-else-if="type === 'warning'">⚠</span>
      <span v-else>ℹ</span>
    </div>
    <div class="error-display__content">
      <h3 v-if="title">{{ title }}</h3>
      <p>{{ errorMessage }}</p>
      <button 
        v-if="showRetry" 
        class="error-display__retry"
        @click="$emit('retry')"
      >
        Tentar novamente
      </button>
    </div>
    <button 
      v-if="dismissible"
      class="error-display__close"
      @click="$emit('dismiss')"
      aria-label="Fechar"
    >
      ×
    </button>
  </div>
</template>

<script>
export default {
  name: 'ErrorDisplay',
  props: {
    error: {
      type: [String, Object, Error],
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'error', // 'error', 'warning', 'info'
      validator: (value) => ['error', 'warning', 'info'].includes(value),
    },
    showRetry: {
      type: Boolean,
      default: false,
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['retry', 'dismiss'],
  computed: {
    errorMessage() {
      if (!this.error) return ''
      
      if (typeof this.error === 'string') {
        return this.error
      }
      
      if (this.error.message) {
        return this.error.message
      }
      
      return 'Ocorreu um erro inesperado'
    },
  },
}
</script>

<style scoped>
.error-display {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
  margin: 16px 0;
}

.error-display--error {
  background: #fee2e2;
  border-left-color: #ef4444;
}

.error-display--warning {
  background: #fef3c7;
  border-left-color: #f59e0b;
}

.error-display--info {
  background: #dbeafe;
  border-left-color: #3b82f6;
}

.error-display__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: 16px;
}

.error-display--error .error-display__icon {
  background: #ef4444;
  color: white;
}

.error-display--warning .error-display__icon {
  background: #f59e0b;
  color: white;
}

.error-display--info .error-display__icon {
  background: #3b82f6;
  color: white;
}

.error-display__content {
  flex: 1;
  min-width: 0;
}

.error-display__content h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.error-display__content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
}

.error-display__retry {
  margin-top: 12px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #4b5563;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.error-display__retry:hover {
  background: #374151;
}

.error-display__close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s;
  padding: 0;
}

.error-display__close:hover {
  color: #1f2937;
}
</style>
